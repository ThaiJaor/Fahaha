from rest_framework import serializers
from .models import Book, Category, Publisher, Promotion
from . import import_serializers


class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='category-detail', read_only=True)

    class Meta:
        model = Category
        fields = ['url', 'id', 'name']


class CategoryDetailSerializer(serializers.ModelSerializer):
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


class PromotionDetailSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='promotion-detail', read_only=True)

    class Meta:
        model = Promotion
        fields = ['url', 'id', 'name', 'description', 'discount',
                  'start_date', 'end_date']


class PromotionSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='promotion-detail', read_only=True)

    class Meta:
        model = Promotion
        fields = ['url', 'id', 'name', 'discount']


class BookDetailSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    publisher = PublisherSerializer(read_only=True)
    promotion = PromotionSerializer(read_only=True)
    discounted_price = serializers.SerializerMethodField(read_only=True)
    is_discounted = serializers.SerializerMethodField(read_only=True)
    url = serializers.HyperlinkedIdentityField(
        view_name='book-detail', read_only=True)

    class Meta:
        model = Book
        fields = ['url', 'id', 'title', 'author', 'format', 'rating', 'price', 'isbn', 'length',
                  'year', 'city_country', 'description', 'image', 'discounted_price', 'is_discounted', 'promotion', 'categories', 'publisher']

    def get_discounted_price(self, obj):
        return obj.get_discounted_price()

    def get_is_discounted(self, obj):
        return obj.is_discounted()


class BookSerializer(serializers.ModelSerializer):
    promotion = PromotionSerializer(read_only=True)

    # source = discounted_price in attach_discounted_price
    # in views.BookListCreateView.get_queryset
    discounted_price = serializers.DecimalField(
        max_digits=15, decimal_places=2)

    is_discounted = serializers.SerializerMethodField(read_only=True)
    url = serializers.HyperlinkedIdentityField(
        view_name='book-detail', read_only=True)

    class Meta:
        model = Book
        fields = ['url', 'title', 'price', 'image',
                  'discounted_price', 'is_discounted', 'promotion']

    def get_is_discounted(self, obj):
        return obj.is_discounted()


class BookQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['author', 'format', 'rating', 'price', 'isbn', 'length',
                  'year', 'city_country']
