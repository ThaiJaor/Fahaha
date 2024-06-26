from rest_framework import serializers
from .models import Book, Category, Publisher
from django.core.files import File
import os
from django.conf import settings


class ImportCategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)

    class Meta:
        model = Category
        fields = ['name', 'description']

    def create(self, validated_data):
        name = validated_data.get('name')
        instance, created = Category.objects.get_or_create(
            name=name, defaults=validated_data)
        if not created:
            instance.description = validated_data.get('description')
            instance.save()
        return instance


class ImportPublisherSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)

    class Meta:
        model = Publisher
        fields = ['name']

    def create(self, validated_data):
        name = validated_data.get('name')
        instance, _ = Publisher.objects.get_or_create(
            name=name, defaults=validated_data)
        return instance


class ImportBookSerializer(serializers.ModelSerializer):
    categories = serializers.ListField(child=serializers.DictField())
    publisher = serializers.DictField()

    image = serializers.CharField()

    title = serializers.CharField(max_length=255)

    class Meta:
        model = Book
        fields = ['title', 'author', 'format', 'rating', 'price', 'sold', 'isbn', 'length',
                  'year', 'city_country', 'description', 'categories', 'publisher', 'image']

    def save(self, validated_data):
        categories_data = validated_data.pop('categories')
        publisher_data = validated_data.pop('publisher')
        image_path = validated_data.pop('image')
        image_path = os.path.join(settings.IMPORTED_FOLDER, image_path)

        book, book_created = Book.objects.get_or_create(
            title=validated_data.get('title'), defaults=validated_data)

        if book_created is False:
            book = super().update(book, validated_data)

        for category_data in categories_data:
            category, _ = Category.objects.get_or_create(**category_data)
            book.categories.add(category)
        publisher, _ = Publisher.objects.get_or_create(**publisher_data)
        book.publisher = publisher

        if os.path.exists(image_path):

            with open(image_path, 'rb') as img_file:
                # Set the image field with the opened file
                filename = os.path.basename(image_path)
                book.image.save(filename, File(img_file))
        book.save()
        return book
