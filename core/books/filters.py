from django_filters import rest_framework as filters
from .models import Book
from django.core.validators import RegexValidator


class BookFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')

    min_year = filters.NumberFilter(field_name="year", lookup_expr='gte')
    max_year = filters.NumberFilter(field_name="year", lookup_expr='lte')

    min_rating = filters.NumberFilter(field_name="rating", lookup_expr='gte')
    max_rating = filters.NumberFilter(field_name="rating", lookup_expr='lte')

    min_discounted_price = filters.NumberFilter(
        field_name="discounted_price", lookup_expr='gte')
    max_discounted_price = filters.NumberFilter(
        field_name="discounted_price", lookup_expr='lte')

    is_discounted = filters.BooleanFilter(
        field_name='promotion', method='filter_is_discounted', label='Is Discounted')

    bformat = filters.CharFilter(
        field_name='format', lookup_expr='iexact', label='Book Format')

    publisher = filters.CharFilter(
        field_name='publisher__name', lookup_expr=['iexact', 'icontains'], label='Publisher Name')

    categories = filters.CharFilter(
        field_name='categories__id', lookup_expr='exact', method='filter_categories', label='Categories IDs', validators=[RegexValidator(r'^\d+(?:_\d+)*$')])

    class Meta:
        model = Book
        fields = ['min_price', 'max_price',
                  'min_discounted_price', 'max_discounted_price',
                  'min_year', 'max_year',
                  'bformat', 'publisher', 'categories', 'is_discounted']

    def filter_is_discounted(self, queryset, name, value):
        if value:
            return queryset.filter(promotion__isnull=False)
        return queryset.filter(promotion__isnull=True)

    def filter_categories(self, queryset, name, value):
        values = value.split('_')
        try:
            category_ids = [int(category_id) for category_id in values]
        except ValueError:
            return queryset.none()

        return queryset.filter(categories__id__in=category_ids)
