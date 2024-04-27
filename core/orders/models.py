from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator
import uuid


class Order(models.Model):
    STATUS_CHOICES = (
        ('processing', 'Processing'),
        ('shipping', 'Shipping'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        'users.User', related_name='orders', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    # processing, shipping, delivered, cancelled
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='processing')
    payment_method = models.CharField(max_length=20)
    recipient_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15, default='', validators=[
        RegexValidator(
            r'^\d{10,15}$', message='Phone number must be between 10 and 15 digits.')
    ])
    shipping_address = models.CharField(max_length=255)
    note = models.TextField()
    payment_transaction_id = models.CharField(max_length=50)

    def __str__(self):
        return f'Order id:{self.order_id} of {self.user}'

    def get_order_items(self):
        return self.order_item.all()

    def get_total_price(self):
        return sum([item.total_price for item in self.get_order_items()])


class OrderItem(models.Model):
    order = models.ForeignKey(
        'Order', related_name='order_item', on_delete=models.CASCADE)
    book = models.ForeignKey(
        'books.Book', related_name='order_item', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    @property
    def total_price(self):
        return self.book.price * self.quantity

    def __str__(self):
        return f'Item {self.book}, {self.order}'
