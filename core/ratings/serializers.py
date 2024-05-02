from rest_framework import serializers
from .models import Rating
from users.models import User


class RatingSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='rating-detail', read_only=True)
    book_url = serializers.HyperlinkedRelatedField(
        view_name='book-detail', source='book', read_only=True)

    class Meta:
        model = Rating
        fields = ['url', 'id', 'user', 'book', 'book_url',
                  'rating', 'comment', 'created_at', 'updated_at']
        read_only_fields = ['created_at']


class RatingDetailSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='rating-detail', read_only=True)
    book_url = serializers.HyperlinkedRelatedField(
        view_name='book-detail', source='book', read_only=True)

    class Meta:
        model = Rating
        fields = ['url', 'id', 'user', 'book', 'book_url',
                  'rating', 'comment', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'user', 'book']
