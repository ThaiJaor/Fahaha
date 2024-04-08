from rest_framework import serializers
from .models import Book, Category, Publisher


class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        'category-detail', read_only=True)

    class Meta:
        model = Category
        fields = ['url', 'id', 'name', 'description']


class PublisherSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='publisher-detail', read_only=True)

    class Meta:
        model = Publisher
        fields = ['url', 'id', 'name']


class BookSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    publisher = PublisherSerializer(read_only=True)
    url = serializers.HyperlinkedIdentityField(
        view_name='book-detail', read_only=True)

    class Meta:
        model = Book
        fields = ['url', 'title', 'author', 'format', 'rating', 'price', 'isbn', 'length',
                  'year', 'city_country', 'description', 'image', 'categories', 'publisher']


class BookQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['author', 'format', 'rating', 'price', 'isbn', 'length',
                  'year', 'city_country']
