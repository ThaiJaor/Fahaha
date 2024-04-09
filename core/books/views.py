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
        # rename price to discounted_price

        # Apply filter for categories
        queryset = self.apply_filter_match_all_id_foreign_field(
            queryset, query_params, 'categories')

        # Apply filter for publisher
        queryset = self.apply_filter_match_some_id_foreign_field(
            queryset, query_params, 'publisher')

        # Apply filter for promotion
        queryset = self.apply_filter_match_some_id_foreign_field(
            queryset, query_params, 'promotion')

        # Apply filter for is_discounted
        is_discounted = query_params.pop('is_discounted', None)
        if (is_discounted is not None):
            if (is_discounted.lower() == 'true'):
                queryset = queryset.filter(promotion__isnull=False)
            elif (is_discounted.lower() == 'false'):
                queryset = queryset.filter(promotion__isnull=True)

        # Attach discounted price
        queryset = self.attach_discounted_price(queryset)

        # Apply filters for discounted price
        queryset = self.apply_filter_range_field(
            queryset, query_params, 'discounted_price')
        # Appy filter for range fields
        queryset = self.apply_filter_range_field(
            queryset, query_params, 'price')
        queryset = self.apply_filter_range_field(
            queryset, query_params, 'rating')
        queryset = self.apply_filter_range_field(
            queryset, query_params, 'length')
        queryset = self.apply_filter_range_field(
            queryset, query_params, 'year')

        # Apply filter for other fields
        serializer = BookQuerySerializer(data=query_params)
        serializer.is_valid(raise_exception=True)
        queryset = queryset.filter(**serializer.validated_data)

        return queryset


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
