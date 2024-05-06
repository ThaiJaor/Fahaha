from django.db import models
from users.models import User
from books.models import Book
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.utils import timezone
from django.core.exceptions import ValidationError


class Cart(models.Model):
    user = models.OneToOneField(User, related_name='cart',
                                on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Cart of {self.user}'

    @property
    def items_count(self):
        return self.items.count()

    @property
    def items(self):
        return self.items.all()

    @property
    def total_price(self):
        return sum([item.total_price for item in self.items.all()])


@receiver(post_save, sender=User)
def create_user_cart(sender, instance, created, **kwargs):
    if created:
        Cart.objects.create(user=instance)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items',
                             on_delete=models.CASCADE)
    book = models.ForeignKey(Book, related_name='cart_items',
                             on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['cart', 'book']

    def __str__(self):
        return f'Item {self.book} in cart of {self.cart.user}'

    @property
    def price(self):
        return self.book.price

    @property
    def total_price(self):
        return self.book.sale_price * self.quantity

    @property
    def sale_price(self):
        return self.book.sale_price

    @property
    def price(self):
        return self.book.price

    @property
    def discount(self):
        return self.book.get_discount()
