from .models import Order
from rest_framework import generics
from core.permissions import IsAdminUserOrReadOnly
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .serializers import CheckoutOrderSerializer, VnpayOrderSerializer
from rest_framework import status
from rest_framework.response import Response
import uuid
from .vnpay import vnpay
from django.conf import settings
from datetime import datetime
# class OrderView(generics.GenericAPIView):
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer
#     permission_classes = [IsAdminUserOrReadOnly]
#     filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
#     ordering_fields = ['created_at', 'total_price']

#     def get_queryset(self):
#         return super().get_queryset().filter(user=self.request.user)

#     def post(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save(user=request.user)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


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
    serializer_class = CheckoutOrderSerializer
    permission_classes = [IsAuthenticated]

    def payment_url(self, request, order_id, amount):
        vnp = vnpay()
        vnp.requestData['vnp_Version'] = '2.1.0'
        vnp.requestData['vnp_Command'] = 'pay'
        vnp.requestData['vnp_TmnCode'] = settings.VNPAY_TMN_CODE
        vnp.requestData['vnp_Amount'] = int(amount * 100)
        vnp.requestData['vnp_CurrCode'] = 'VND'
        vnp.requestData['vnp_TxnRef'] = order_id
        vnp.requestData['vnp_CreateDate'] = datetime.now().strftime(
            '%Y%m%d%H%M%S')
        vnp.requestData['vnp_OrderInfo'] = 'Payment for order ' + order_id + \
            ' of user ' + request.user.email + ' at ' + \
            vnp.requestData['vnp_CreateDate']
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
    def post(self, request):
        try:
            serializer = self.get_serializer_class()(data=request.data)
            serializer.is_valid(raise_exception=True)
            order_id = serializer.data['order_id']
            amount = serializer.data['total_price']
            amount = usd_to_vnd(amount)
            print(order_id, amount)
            # create vnpay payment url
            vnpay_payment_url = self.payment_url(request, order_id, amount)
            print(vnpay_payment_url)
            return Response({'vnpay_payment_url': vnpay_payment_url}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class VnpayPaymentResponseView(generics.GenericAPIView):
    serializer_class = VnpayOrderSerializer
    permission_classes = [IsAuthenticated]

    # Check response from vnpay and create order
    def post(self, request):
        try:

            vnp = vnpay()
            vnp.responseData = request.GET.dict()
            # recipent_name, phone_number, shipping_address, note, items
            serializer = self.get_serializer_class()(data=request.data)
            serializer.is_valid(raise_exception=True)
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

            print(data['items'], data['total_price'])

            for item in data['items']:
                item['total_price'] = str(item['total_price'])

            print(data['items'], data['total_price'])

            if vnp.validate_response(settings.VNPAY_HASH_SECRET_KEY):
                if vnp_ResponseCode == '00':
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
