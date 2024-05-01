from rest_framework import serializers
from .models import Cart, CartItem
from books.models import Book
from users.models import User
from django.urls import reverse


class CartItemDetailSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)
    item_id = serializers.PrimaryKeyRelatedField(
        source='book', queryset=Book.objects.all())

    class Meta:
        model = CartItem
        fields = ['url', 'cart',
                  'item_id', 'quantity', 'total_price', 'discount', 'price']
        read_only_fields = ['total_price', 'discount', 'price', 'cart']

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Quantity must be greater than zero.")
        return value

    def get_url(self, obj):
        kwargs = {
            'cart_id': obj.cart_id,
            'item_id': obj.book_id
        }
        return self.context['request'].build_absolute_uri(reverse('cart-item-detail', kwargs=kwargs))

    def create(self, validated_data):
        book = validated_data.pop('book')
        cart = validated_data.pop('cart')
        if cart.items.filter(book=book).exists():
            raise serializers.ValidationError(
                "This book is already in the cart.")
        return super().create(validated_data)


class CartSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='cart-detail', read_only=True)
    items = CartItemDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['url', 'user', 'total_price', 'items']

    def create(self, validated_data):
        cart = Cart.objects.create(**validated_data)
        return cart


class CartDetailSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='cart-detail', read_only=True)
    items = CartItemDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['url', 'user', 'total_price', 'items']
