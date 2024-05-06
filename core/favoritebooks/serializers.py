from rest_framework import serializers
from .models import FavoriteBook
from books.models import Book
from books.serializers import PromotionSerializer, BookSerializer


class FavoriteBookSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='favorite-books-detail', read_only=True)
    book = serializers.SlugRelatedField(
        slug_field='id',
        queryset=Book.objects.all()
    )

    class Meta:
        model = FavoriteBook
        fields = ['url', 'id', 'user', 'book']
