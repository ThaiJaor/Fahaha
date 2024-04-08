from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from django.utils.text import slugify
from decimal import Decimal, ROUND_HALF_UP


def custom_upload_to(instance, filename):
    old_instance = Book.objects.get(pk=instance.pk)
    old_instance.image.delete()
    new_filename = f'books-cover/{slugify(instance.title)}_{instance.pk}_{filename}'
    return new_filename


class Book(models.Model):
    title = models.CharField(max_length=255, unique=True)
    author = models.CharField(max_length=255, blank=True, null=True)
    format = models.CharField(max_length=255, blank=True, null=True)
    rating = models.FloatField(validators=[MinValueValidator(
        0), MaxValueValidator(5)], blank=True, null=True)
    price = models.DecimalField(
        max_digits=15, decimal_places=2, blank=True, null=True)
    isbn = models.CharField(max_length=255, blank=True, null=True)
    length = models.IntegerField(blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    city_country = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    image = models.ImageField(
        upload_to=custom_upload_to, null=True, blank=True)

    categories = models.ManyToManyField(
        'Category', related_name='books', blank=True)
    publisher = models.ForeignKey(
        'Publisher', related_name='books', on_delete=models.SET_NULL, blank=True, null=True)

    promotion = models.ForeignKey(
        'Promotion', related_name='books', on_delete=models.SET_NULL, blank=True, null=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title

    def get_discounted_price(self):
        if self.promotion:
            discount_decimal = Decimal(self.promotion.discount) / Decimal(100)
            discounted_price = self.price - (self.price * discount_decimal)
            discounted_price = discounted_price.quantize(
                Decimal('0.01'), rounding=ROUND_HALF_UP)
            return str(discounted_price)
        return str(self.price)


class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    @property
    def books_count(self):
        return self.books.count()

    @property
    def get_books(self):
        return self.books.all()


class Publisher(models.Model):
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    @property
    def books_count(self):
        return self.books.count()

    @property
    def get_books(self):
        return self.books.all()


class Promotion(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(max_length=255, blank=True, null=True)
    discount = models.FloatField(validators=[MinValueValidator(
        0), MaxValueValidator(100)], blank=True, null=True)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(
        default=timezone.now() + timezone.timedelta(days=30))
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    @ property
    def books_count(self):
        return self.books.count()

    @ property
    def get_books(self):
        return self.books.all()
