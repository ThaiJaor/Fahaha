from .models import Book, Category, Publisher, Promotion
from .serializers import BookSerializer, BookDetailSerializer
from .serializers import CategorySerializer, CategoryDetailSerializer, CategoryWithImageSerializer
from .serializers import PublisherSerializer, PublisherWithImageSerializer
from .serializers import PromotionSerializer, PromotionDetailSerializer
from rest_framework import generics
from core.permissions import IsAdminUserOrReadOnly
# from .mixins import FilterMixin
from .filters import BookFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
# Book views


class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_class = BookFilter
    ordering_fields = ['sale_price', 'rating', 'year', 'sold']
    search_fields = ['title', 'author', 'description', 'city_country',
                     'categories__name', 'publisher__name', 'promotion__name']

    def get_serializer_class(self):
        if self.request.method == 'POST':  # Create new book
            return BookDetailSerializer
        return super().get_serializer_class()
    
    @method_decorator(cache_page(60 * 60))  # Cache GET requests for 60 minutes
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookDetailSerializer
    lookup_field = 'pk'
    permission_classes = [IsAdminUserOrReadOnly]
    
    @method_decorator(cache_page(60 * 60))  # Cache GET requests for 60 minutes
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
# Category views


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryWithImageSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'POST':  # Create new category
            return CategoryDetailSerializer
        return super().get_serializer_class()


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryDetailSerializer
    lookup_field = 'pk'
    permission_classes = [IsAdminUserOrReadOnly]


# Publisher views
class PublisherListCreateView(generics.ListCreateAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherWithImageSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class PublisherDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer
    lookup_field = 'pk'
    permission_classes = [IsAdminUserOrReadOnly]


class PromotionListCreateView(generics.ListCreateAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'POST':  # Create new promotion
            return PromotionDetailSerializer
        return super().get_serializer_class()


class PromotionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionDetailSerializer
    lookup_field = 'pk'
    permission_classes = [IsAdminUserOrReadOnly]
