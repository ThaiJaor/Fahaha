from rest_framework import serializers
from .models import Book, Category, Publisher


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ['id', 'name']


class BookSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)
    publisher = PublisherSerializer()
    url = serializers.HyperlinkedIdentityField(
        view_name='book-detail', read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'format', 'rating', 'price', 'isbn', 'length',
                  'year', 'city_country', 'description', 'categories', 'publisher', 'image', 'url']
