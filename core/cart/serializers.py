from rest_framework import serializers
from .models import Cart, CartItem
from books.models import Book
from users.models import User
from django.urls import reverse


class CartItemDetailSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='cart-item-detail',
        lookup_url_kwarg='item_id',
        lookup_field='book_id',
    )

    item_id = serializers.PrimaryKeyRelatedField(
        source='book', queryset=Book.objects.all())

    class Meta:
        model = CartItem
        fields = ['url', 'cart',
                  'item_id', 'quantity', 'price', 'discount', 'total_price']
        read_only_fields = ['total_price', 'discount', 'price', 'cart']

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Quantity must be greater than zero.")
        return value

    def create(self, validated_data):
        print(validated_data)
        book = validated_data.get('book')
        cart = self.context['request'].user.cart
        if cart.items.filter(book=book).exists():
            raise serializers.ValidationError(
                "This book is already in the cart.")
        return super().create(validated_data)


class CartDetailSerializer(serializers.ModelSerializer):
    items = CartItemDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['user', 'total_price', 'items']


class CartItemSerializer(serializers.ModelSerializer):
    item_id = serializers.IntegerField(source='book.id', read_only=True)

    class Meta:
        model = CartItem
        fields = ['item_id', 'quantity',
                  'price', 'discount', 'total_price']
        read_only_fields = ['total_price', 'discount', 'price', 'cart']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['user', 'total_price', 'items']
