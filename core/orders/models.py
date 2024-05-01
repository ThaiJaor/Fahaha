from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator
import uuid
from books.models import Book
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver


def uuid_hex():
    return uuid.uuid4().hex


class Order(models.Model):
    STATUS_CHOICES = (
        ('processing', 'Processing'),
        ('shipping', 'Shipping'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    )

    id = models.CharField(primary_key=True, default=uuid_hex,
                          max_length=255, editable=False)
    user = models.ForeignKey(
        'users.User', related_name='orders', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    total_price = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.0)
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
    note = models.TextField(blank=True, null=True, default='')
    payment_transaction_id = models.CharField(max_length=50)
    payment_amount = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.0)
    payment_currency = models.CharField(max_length=3, default='VND')
    items = models.JSONField(default=list)

    def __str__(self):
        return f'Order id:{self.id} of {self.user}'


@ receiver(post_save, sender=Order)
def update_book_sold(sender, instance, created, **kwargs):
    if created:
        for item in instance.items:
            book = Book.objects.get(pk=item['item_id'])
            book.sold += item['quantity']
            book.save()
