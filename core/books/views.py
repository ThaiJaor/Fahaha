from .models import Book, Category, Publisher, Promotion
from .serializers import BookSerializer, BookQuerySerializer, BookDetailSerializer
from .serializers import CategorySerializer, CategoryDetailSerializer
from .serializers import PublisherSerializer
from .serializers import PromotionSerializer, PromotionDetailSerializer
from rest_framework import generics
from core.permissions import IsAdminUserOrReadOnly
from .mixins import FilterMixin

# Book views


class BookListCreateView(FilterMixin, generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'POST':  # Create new book
            return BookDetailSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        # Get the initial queryset
        queryset = super().get_queryset()
        query_params = self.request.query_params.dict()
        # rename bformat to format
        if 'bformat' in query_params:
            query_params['format'] = query_params.pop('bformat')

        # Apply filters

        # Apply filter for categories
        queryset = self.apply_filter_match_all_id_foreign_field(
            queryset, query_params, 'categories')

        # Apply filter for publisher
        queryset = self.apply_filter_match_some_id_foreign_field(
            queryset, query_params, 'publisher')

        queryset = self.apply_filter_match_some_id_foreign_field(
            queryset, query_params, 'promotion')

        # Appy filter for range fields
        queryset = self.apply_filter_range_field(
            queryset, query_params, 'price')
        queryset = self.apply_filter_range_field(
            queryset, query_params, 'rating')
        queryset = self.apply_filter_range_field(
            queryset, query_params, 'length')
        queryset = self.apply_filter_range_field(
            queryset, query_params, 'year')
        serializer = BookQuerySerializer(data=query_params)
        serializer.is_valid(raise_exception=True)
        # Apply filter for other fields
        queryset = queryset.filter(**serializer.validated_data)
        return queryset

    def perform_create(self, serializer):
        serializer_class = BookDetailSerializer
        return super().perform_create(serializer)


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
