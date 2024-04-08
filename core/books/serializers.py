from rest_framework import serializers
from .models import Book, Category, Publisher, Promotion


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
    discounted_price = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(
        view_name='book-detail', read_only=True)

    class Meta:
        model = Book
        fields = ['url', 'title', 'author', 'format', 'rating', 'price', 'isbn', 'length',
                  'year', 'city_country', 'description', 'image', 'discounted_price', 'promotion', 'categories', 'publisher']

    def get_discounted_price(self, obj):
        return obj.get_discounted_price()


class BookSerializer(serializers.ModelSerializer):
    promotion = PromotionSerializer(read_only=True)
    discounted_price = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(
        view_name='book-detail', read_only=True)

    class Meta:
        model = Book
        fields = ['url', 'title', 'price', 'image',
                  'discounted_price', 'promotion']

    def get_discounted_price(self, obj):
        return obj.get_discounted_price()


class BookQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['author', 'format', 'rating', 'price', 'isbn', 'length',
                  'year', 'city_country']
