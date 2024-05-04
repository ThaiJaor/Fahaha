from .models import Order
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from core.permissions import IsAdminUserOrReadOnly, IsOwnerOrAdmin
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .serializers import CheckoutOrderSerializer, CheckoutOrderItemSerializer, OrderSerializer
from rest_framework import status
from rest_framework.response import Response
import uuid
from .vnpay import vnpay
from django.conf import settings
from datetime import datetime
import json


class AllOrdersListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'payment_method', 'user']
    ordering_fields = ['created_at', 'total_price']
    ordering = ['-created_at']


class OrderListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'payment_method']
    ordering_fields = ['created_at', 'total_price']
    ordering = ['-created_at']

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUserOrReadOnly, IsOwnerOrAdmin]
    lookup_field = 'pk'


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def usd_to_vnd(usd):
    return usd * 23000


class VnpayPaymentUrlView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def generate_order_id(self):
        return uuid.uuid4().hex

    def get_cart(self, request):
        return request.user.cart

    def payment_url(self, request, order_id, amount):
        vnp = vnpay()
        vnp.requestData['vnp_Version'] = '2.1.0'
        vnp.requestData['vnp_Command'] = 'pay'
        vnp.requestData['vnp_TmnCode'] = settings.VNPAY_TMN_CODE
        vnp.requestData['vnp_Amount'] = int(amount * 100)
        vnp.requestData['vnp_CurrCode'] = 'VND'
        vnp.requestData['vnp_TxnRef'] = order_id
        now = datetime.now()
        vnp.requestData['vnp_CreateDate'] = now.strftime(
            '%Y%m%d%H%M%S')
        vnp.requestData['vnp_OrderInfo'] = 'Payment for order ' + order_id + \
            ' of user ' + request.user.email + ' at ' + \
            now.strftime("%Y-%m-%d %H:%M:%S")
        vnp.requestData['vnp_OrderType'] = 'billpayment'
        vnp.requestData['vnp_Locale'] = 'vn'
        # vnp.requestData['vnp_BankCode'] = 'NCB'
        ipaddr = get_client_ip(request)
        vnp.requestData['vnp_IpAddr'] = ipaddr
        vnp.requestData['vnp_ReturnUrl'] = settings.VNPAY_RETURN_URL
        print(vnp.requestData)
        vnpay_payment_url = vnp.get_payment_url(
            settings.VNPAY_PAYMENT_URL, settings.VNPAY_HASH_SECRET_KEY)
        print(vnpay_payment_url)
        return vnpay_payment_url

    # payment url of vnpay
    def get(self, request):
        try:
            order_id = self.generate_order_id()
            cart = self.get_cart(request)
            amount = cart.total_price
            amount = usd_to_vnd(amount)
            print("Generated Order ID:", order_id)
            print("Amount:", amount)
            # create vnpay payment url
            vnpay_payment_url = self.payment_url(request, order_id, amount)
            print(vnpay_payment_url)
            return Response({'vnpay_payment_url': vnpay_payment_url}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class VnpayPaymentResponseView(generics.GenericAPIView):
    serializer_class = CheckoutOrderSerializer
    permission_classes = [IsAuthenticated]

    # Check response from vnpay and create order
    def post(self, request):
        try:
            vnp = vnpay()
            vnp.responseData = request.GET.dict()
            # recipent_name, phone_number, shipping_address, note
            cart = request.user.cart
            items = cart.items.all()
            total_price = cart.total_price

            serializer = self.get_serializer_class()(data=request.data)
            serializer.is_valid(raise_exception=True)
            print(serializer.data)

            data = serializer.data

            vnp_ResponseCode = vnp.responseData['vnp_ResponseCode']

            order_desc = vnp.responseData['vnp_OrderInfo']
            amount = int(vnp.responseData['vnp_Amount']) / 100
            vnp_TransactionNo = vnp.responseData['vnp_TransactionNo']
            recipient_name = data['recipient_name'] or request.user.full_name
            phone_number = data['phone_number'] or request.user.phone_number
            shipping_address = data['shipping_address'] or ''
            note = data['note'] or ''
            order_id = vnp.responseData['vnp_TxnRef']

            data['items'] = CheckoutOrderItemSerializer(items, many=True).data
            print(data['items'])
            data['total_price'] = total_price
            if vnp.validate_response(settings.VNPAY_HASH_SECRET_KEY):
                print('='*60)
                print(vnp_ResponseCode)
                if vnp_ResponseCode == '00':
                    orders = Order.objects.filter(id=order_id)
                    order = orders.first() if orders.exists() else None
                    if order:
                        return Response({'detail': 'Order already exists',
                                        'order_id': order.id,
                                         'payment_amount': order.payment_amount,
                                         'payment_method': order.payment_method,
                                         'payment_currency': order.payment_currency,
                                         'total_price': order.total_price,
                                         'price_currency': 'USD',
                                         'order_desc': order_desc,
                                         'vnp_TransactionNo': vnp.responseData['vnp_TransactionNo'],
                                         'vnp_ResponseCode': vnp_ResponseCode,
                                         'recipient_name': order.recipient_name,
                                         'phone_number': order.phone_number,
                                         'shipping_address': order.shipping_address,
                                         'note': order.note
                                         }, status=status.HTTP_400_BAD_REQUEST)

                    order = Order.objects.create(
                        id=order_id,
                        user=request.user,
                        payment_method='VNPAY',
                        recipient_name=recipient_name,
                        phone_number=phone_number,
                        shipping_address=shipping_address,
                        payment_transaction_id=vnp_TransactionNo,
                        payment_amount=amount,
                        payment_currency='VND',
                        note=note,
                        items=data['items'],
                        total_price=data['total_price'],
                        status='processing'
                    )
                    print('='*60)
                    # Reset Cart
                    cart.items.all().delete()
                    return Response({'detail': 'Transaction succeeds and Create order successfully',
                                    'order_id': order_id,
                                     'payment_amount': amount,
                                     'payment_method': 'VNPAY',
                                     'payment_currency': 'VND',
                                     'total_price': order.total_price,
                                     'price_currency': 'USD',
                                     'order_desc': order_desc,
                                     'vnp_TransactionNo': vnp.responseData['vnp_TransactionNo'],
                                     'vnp_ResponseCode': vnp_ResponseCode,
                                     'recipient_name': recipient_name,
                                     'phone_number': phone_number,
                                     'shipping_address': shipping_address,
                                     'note': note
                                     }, status=status.HTTP_200_OK)
                else:
                    return Response({'detail': 'Transaction failed with response code: ' + vnp_ResponseCode,
                                    'order_id': order_id,
                                     'payment_amount': amount,
                                     'payment_method': 'VNPAY',
                                     'payment_currency': 'VND',
                                     'order_desc': order_desc,
                                     'vnp_TransactionNo': vnp.responseData['vnp_TransactionNo'],
                                     'vnp_ResponseCode': vnp_ResponseCode,
                                     'recipient_name': recipient_name,
                                     'phone_number': phone_number,
                                     'shipping_address': shipping_address,
                                     'note': note
                                     }, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'detail': 'Invalid response from VNPAY, Wrong checksum',
                                'order_id': order_id,
                                 'payment_amount': amount,
                                 'payment_method': 'VNPAY',
                                 'payment_currency': 'VND',
                                 'order_desc': order_desc,
                                 'vnp_TransactionNo': vnp.responseData['vnp_TransactionNo'],
                                 'vnp_ResponseCode': vnp_ResponseCode,
                                 'recipient_name': recipient_name,
                                 'phone_number': phone_number,
                                 'shipping_address': shipping_address,
                                 'note': note
                                 }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
