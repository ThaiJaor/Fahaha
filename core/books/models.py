from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from django.utils.text import slugify
from decimal import Decimal, ROUND_HALF_UP
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver
from django.urls import reverse


def custom_upload_to(instance, filename):
    old_instance = Book.objects.get(pk=instance.pk)
    old_instance.image.delete()
    new_filename = f'books-cover/{slugify(instance.title)}_{instance.pk}_{filename}'
    return new_filename


class Book(models.Model):

    FORMAT_CHOICES = (
        ('Paperback', 'Paperback'),
        ('Hardback', 'Hardback'),
    )

    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255, blank=True, null=True)
    format = models.CharField(
        max_length=255, choices=FORMAT_CHOICES, blank=True, null=True)
    rating = models.FloatField(validators=[MinValueValidator(
        0), MaxValueValidator(5)], blank=True, null=True)
    rating_count = models.PositiveIntegerField(
        default=1, blank=True, null=True)
    price = models.DecimalField(
        max_digits=15, decimal_places=2, blank=True, null=True)
    isbn = models.CharField(max_length=255, blank=True, null=True)
    length = models.IntegerField(blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)

    city_country = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    sold = models.IntegerField(default=0, blank=True, null=True)

    image = models.ImageField(
        upload_to=custom_upload_to, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    categories = models.ManyToManyField(
        'Category', related_name='books', blank=True)
    publisher = models.ForeignKey(
        'Publisher', related_name='books', on_delete=models.SET_NULL, blank=True, null=True)

    promotion = models.ForeignKey(
        'Promotion', related_name='books', on_delete=models.SET_NULL, blank=True, null=True)

    sale_price = models.DecimalField(
        max_digits=15, decimal_places=2, blank=True, null=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return f'id:{self.pk} - {self.title}'

    def save(self, *args, **kwargs):
        if self.promotion:
            self.sale_price = self.get_sale_price()
        else:
            self.sale_price = self.price
        super().save(*args, **kwargs)

    def get_sale_price(self):
        if self.promotion:
            discount_decimal = Decimal(self.promotion.discount) / Decimal(100)
            discounted_price = self.price - (self.price * discount_decimal)
            discounted_price = discounted_price.quantize(
                Decimal('0.01'), rounding=ROUND_HALF_UP)
            return discounted_price
        return self.price

    def is_discounted(self):
        if self.promotion:
            return True
        return False

    def get_discount(self):
        if self.promotion:
            return self.promotion.discount
        return 0

    def get_ratings_url(self):
        url = reverse('rating-list')
        url += f'?book={self.pk}'
        return url


class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f'id:{self.pk} - {self.name}'

    @ property
    def books_count(self):
        return self.books.count()

    def get_books(self):
        return self.books.all()


class Publisher(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f'id:{self.pk} - {self.name}'

    @ property
    def books_count(self):
        return self.books.count()

    def get_books(self):
        return self.books.all()


def custom_end_date():
    return timezone.now() + timezone.timedelta(days=2)


class Promotion(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=255, blank=True, null=True)
    discount = models.FloatField(validators=[MinValueValidator(
        0), MaxValueValidator(100)], blank=True, null=True)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(
        default=custom_end_date)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f'id:{self.pk} - {self.name}'

    @ property
    def books_count(self):
        return self.books.count()

    def get_books(self):
        return self.books.all()

    def is_expired(self):
        return timezone.now() > self.end_date


@ receiver(post_delete, sender=Promotion)
def reset_books_price(sender, instance, **kwargs):
    books = instance.books.all()
    for book in books:
        book.sale_price = book.price
        book.save()


@ receiver(post_save, sender=Promotion)
def update_books_price(sender, instance, **kwargs):
    books = instance.books.all()
    for book in books:
        book.sale_price = book.get_sale_price()
        book.save()
