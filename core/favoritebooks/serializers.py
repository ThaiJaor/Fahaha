from rest_framework import serializers
from .models import FavoriteBook
from books.models import Book
from books.serializers import PromotionSerializer, BookSerializer


class FavoriteBookSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='favorite-books-detail', read_only=True)

    book = BookSerializer(read_only=True)

    class Meta:
        model = FavoriteBook
        fields = ['url', 'id', 'user', 'book']


class FavoriteBookCreateSerializer(serializers.ModelSerializer):

    book = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(), write_only=True)

    class Meta:
        model = FavoriteBook
        fields = ['book']

    def validate_book(self, value):
        if self.context['request'].user.favorite_books.filter(book=value).exists():
            raise serializers.ValidationError(
                "This book is already in your favorite list.")
        return value
