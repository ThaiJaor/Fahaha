from .serializers import CartSerializer, CartDetailSerializer, CartItemDetailSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import mixins
from .models import Cart
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend


class CartListView(generics.ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user']


class CartDetailView(mixins.RetrieveModelMixin,
                     mixins.DestroyModelMixin,
                     mixins.CreateModelMixin,
                     generics.GenericAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':  # Create new CartItem
            return CartItemDetailSerializer
        return super().get_serializer_class()

    # Retrieve Cart
    def get_object(self):
        return self.request.user.cart

    # Remove all CartItems in Cart
    def perform_destroy(self, instance):
        for item in instance.items.all():
            item.delete()

    # Create new CartItem
    def perform_create(self, serializer):
        cart = self.get_object()
        serializer.save(cart=cart)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class CartItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartItemDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        cart = self.request.user.cart
        return get_object_or_404(cart.items.all(), book_id=self.kwargs['item_id'])
