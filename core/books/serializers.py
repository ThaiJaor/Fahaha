from rest_framework import serializers
from .models import Book, Category, Publisher, Promotion
from . import import_serializers


class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='category-detail', read_only=True)

    class Meta:
        model = Category
        fields = ['url', 'id', 'name']


class CategoryWithImageSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='category-detail', read_only=True)

    image = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Category
        fields = ['url', 'id', 'name', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.books.exists():
            books = obj.books.filter(image__isnull=False)
            if books.exists():
                photo_url = books.first().image.url
                return request.build_absolute_uri(photo_url)
            return None
        return None


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


class PublisherWithImageSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='publisher-detail', read_only=True)

    image = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Publisher
        fields = ['url', 'id', 'name', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.books.exists():
            books = obj.books.filter(image__isnull=False)
            if books.exists():
                photo_url = books.first().image.url
                return request.build_absolute_uri(photo_url)
            return None
        return None


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
        fields = ['url', 'id', 'name', 'discount', 'start_date', 'end_date']


class BookDetailSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    publisher = PublisherSerializer(read_only=True)
    promotion = PromotionSerializer(read_only=True)
    is_discounted = serializers.SerializerMethodField(read_only=True)
    url = serializers.HyperlinkedIdentityField(
        view_name='book-detail', read_only=True)
    _promotion = serializers.PrimaryKeyRelatedField(
        queryset=Promotion.objects.all(), source='promotion', required=False, allow_null=True)
    _categories = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='categories', many=True, required=False, allow_null=True)
    _publisher = serializers.PrimaryKeyRelatedField(
        queryset=Publisher.objects.all(), source='publisher', required=False, allow_null=True)

    ratings_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Book
        fields = ['url', 'id', 'title', 'author', 'format', 'rating', 'rating_count', 'ratings_url', 'price', 'isbn', 'length',
                  'year', 'city_country', 'description', 'image', 'sale_price', 'is_discounted', 'sold',
                  'promotion', 'categories', 'publisher', '_promotion', '_categories', '_publisher']

    def get_is_discounted(self, obj):
        return obj.is_discounted()

    def get_ratings_url(self, obj):
        url = obj.get_ratings_url()
        url = self.context['request'].build_absolute_uri(url)
        return url


class BookSerializer(serializers.ModelSerializer):
    promotion = PromotionSerializer(read_only=True)
    is_discounted = serializers.SerializerMethodField(read_only=True)
    url = serializers.HyperlinkedIdentityField(
        view_name='book-detail', read_only=True)

    class Meta:
        model = Book
        fields = ['url', 'id', 'title', 'price', 'image',
                  'sale_price', 'is_discounted', 'sold', 'promotion']

    def get_is_discounted(self, obj):
        return obj.is_discounted()


class BookQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['author', 'format', 'rating', 'price', 'isbn', 'length',
                  'year', 'city_country']
