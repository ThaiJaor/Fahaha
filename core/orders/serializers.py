from rest_framework import serializers
from .models import Order, OrderItem
from books.models import Book
import uuid


class CheckoutOrderItemSerializer(serializers.Serializer):
    book_id = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    quantity = serializers.IntegerField()
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    discount = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        fields = ['book_id', 'quantity', 'total_price', 'discount']
        read_only_fields = ['total_price', 'discount']

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Quantity must be greater than zero.")
        return value

    def get_total_price(self):
        obj = Book.objects.get(id=self.validated_data['book_id'])
        return obj.book.price * obj.quantity

    def get_discount(self):
        obj = Book.objects.get(id=self.validated_data['book_id'])
        return obj.book.promotion.discount


class CheckoutOrderSerializer(serializers.Serializer):
    items = CheckoutOrderItemSerializer(many=True)
    order_id = serializers.UUIDField(default=uuid.uuid4())
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = Order
        fields = ['items', 'order_id', 'total_price']

    def get_total_price(self):
        return sum([item.total_price for item in self.validated_data['items']])


# class OrderItemSerializer(serializers.ModelSerializer):
#     book_id = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())

#     class Meta:
#         model = OrderItem
#         fields = '__all__'
#         read_only_fields = ['order', 'book_id', 'quantity']
