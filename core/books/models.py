from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone


class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    format = models.CharField(max_length=255)
    rating = models.DecimalField(
        max_digits=5, decimal_places=2, validators=[MinValueValidator(0), MaxValueValidator(5)], blank=True, null=True)
    price = models.DecimalField(
        max_digits=15, decimal_places=2, blank=True, null=True)
    isbn = models.CharField(max_length=255, blank=True, null=True)
    length = models.IntegerField(blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    city_country = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(max_length=255, blank=True, null=True)

    categories = models.ManyToManyField(
        'Category', related_name='books')
    publisher = models.ForeignKey(
        'Publisher', related_name='books', on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=255)

    def __str__(self):
        return self.name


class Publisher(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
