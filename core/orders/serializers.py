from rest_framework import serializers
from .models import Order
from cart.models import CartItem, Cart
from books.models import Book
from django.core.validators import RegexValidator


class CheckoutOrderItemSerializer(serializers.ModelSerializer):
    item_id = serializers.PrimaryKeyRelatedField(
        source='book', queryset=Book.objects.all())
    price = serializers.SerializerMethodField(read_only=True)
    sale_price = serializers.SerializerMethodField(read_only=True)
    total_price = serializers.SerializerMethodField(read_only=True)
    title = serializers.CharField(source='book.title', read_only=True)

    class Meta:
        model = CartItem
        fields = ['item_id', 'title', 'quantity', 'price',
                  'sale_price', 'discount', 'total_price']
        read_only_fields = ['total_price',
                            'discount', 'price', 'sale_price']

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Quantity must be greater than zero.")
        return value

    def get_total_price(self, obj):
        return str(obj.total_price)

    def get_sale_price(self, obj):
        return str(obj.sale_price)

    def get_price(self, obj):
        return str(obj.price)


class CheckoutOrderSerializer(serializers.Serializer):
    recipient_name = serializers.CharField(max_length=255, allow_blank=True)
    phone_number = serializers.CharField(max_length=15, validators=[
        RegexValidator(
            r'^\d{10,15}$', message='Phone number must be between 10 and 15 digits.')
    ], allow_blank=True)
    shipping_address = serializers.CharField(max_length=255, allow_blank=True)
    note = serializers.CharField(
        max_length=255, required=False, allow_blank=True)

    class Meta:
        fields = ['recipient_name', 'phone_number', 'shipping_address', 'note']


class ItemsOrderSerializer(serializers.Serializer):
    item_id = serializers.CharField(max_length=255, read_only=True)
    # title = serializers.CharField(max_length=255, read_only=True)
    price = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True)
    sale_price = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True)
    quantity = serializers.IntegerField()
    discount = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True)
    total_price = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        fields = ['item_id', 'quantity', 'price',
                  'sale_price', 'discount', 'total_price']


class OrderSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='order-detail', lookup_field='pk')

    user = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault())

    # items = ItemsOrderSerializer(many=True)

    class Meta:
        model = Order
        fields = '__all__'
