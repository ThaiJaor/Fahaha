from .models import Book, Category, Publisher, Promotion
from .serializers import BookSerializer, BookQuerySerializer, BookDetailSerializer
from .serializers import CategorySerializer, CategoryDetailSerializer
from .serializers import PublisherSerializer
from .serializers import PromotionSerializer, PromotionDetailSerializer
from rest_framework import generics
from core.permissions import IsAdminUserOrReadOnly
# from .mixins import FilterMixin
from .filters import BookFilter
from django_filters import rest_framework as filters

# Book views


class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = BookFilter

    def get_serializer_class(self):
        if self.request.method == 'POST':  # Create new book
            return BookDetailSerializer
        return super().get_serializer_class()


class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookDetailSerializer
    lookup_field = 'pk'
    permission_classes = [IsAdminUserOrReadOnly]


# Category views
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'
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
    serializer_class = PublisherSerializer
    lookup_field = 'pk'
    permission_classes = [IsAdminUserOrReadOnly]


class PublisherDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer
    lookup_field = 'pk'
    permission_classes = [IsAdminUserOrReadOnly]


class PromotionListCreateView(generics.ListCreateAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
    lookup_field = 'pk'
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
