from .serializers import CartSerializer, CartDetailSerializer, CartItemDetailSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsAdminUserOrOwner, IsAdminUserOrReadOnly
from rest_framework import mixins
from .models import Cart, CartItem
from django.shortcuts import get_object_or_404


class CartListCreateView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class CartDetailView(mixins.RetrieveModelMixin,
                     mixins.DestroyModelMixin,
                     mixins.CreateModelMixin,
                     generics.GenericAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartDetailSerializer
    permission_classes = [IsAdminUserOrOwner]
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.request.method == 'POST':  # Create new CartItem
            return CartItemDetailSerializer
        return super().get_serializer_class()

    def get_object(self):
        pk = self.kwargs.get('pk')
        return get_object_or_404(Cart, pk=pk)

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
        cart_id = self.kwargs.get('cart_id')
        item_id = self.kwargs.get('item_id')
        return get_object_or_404(CartItem, cart_id=cart_id, book_id=item_id)

    def get_queryset(self):
        return self.request.user.cart.items.all()
