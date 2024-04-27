from rest_framework import serializers
from .models import Order
from books.models import Book
import uuid


class CheckoutOrderItemSerializer(serializers.Serializer):
    item_id = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    quantity = serializers.IntegerField()
    total_price = serializers.SerializerMethodField(read_only=True)
    discount = serializers.SerializerMethodField(read_only=True)

    class Meta:
        fields = ['item_id', 'quantity', 'total_price', 'discount']

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Quantity must be greater than zero.")
        return value

    def get_total_price(self, validated_data):
        obj = validated_data['item_id']
        return obj.sale_price * validated_data['quantity']

    def get_discount(self, validated_data):
        obj = validated_data['item_id']
        return obj.promotion.discount if obj.promotion else 0

    def to_representation(self, instance):
        instance['total_price'] = self.get_total_price(instance)
        instance['promotion'] = self.get_discount(instance)
        return super().to_representation(instance)


class CheckoutOrderSerializer(serializers.Serializer):
    items = CheckoutOrderItemSerializer(many=True)
    order_id = serializers.SerializerMethodField(read_only=True)
    total_price = serializers.SerializerMethodField(read_only=True)

    class Meta:
        fields = ['items', 'order_id', 'total_price']

    def get_total_price(self, validated_data):
        # obj is the validated data
        # Extract items from the object
        items = validated_data.get('items', [])
        return sum(item['total_price'] for item in items)

    def get_order_id(self, validated_data):
        return uuid.uuid4().hex


class VnpayOrderSerializer(serializers.ModelSerializer):
    items = CheckoutOrderItemSerializer(many=True)
    total_price = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = ['recipient_name', 'phone_number',
                  'shipping_address', 'note', 'items', 'total_price']

    def get_total_price(self, validated_data):
        items = validated_data.get('items', [])
        return sum(item['total_price'] for item in items)
