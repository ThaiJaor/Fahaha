from decimal import Decimal
from django.db.models import F, ExpressionWrapper, DecimalField, Value
from django.db.models.functions import Coalesce


class FilterMixin:

    def attach_discounted_price(self, queryset):
        return queryset.annotate(
            discounted_price=ExpressionWrapper(
                F('price') - (F('price') *
                              Coalesce(F('promotion__discount'), Value(0)) / 100),
                output_field=DecimalField(),
            )
        )

    def is_number(self, s):
        try:
            float(s)
            return True
        except ValueError:
            return False

    def apply_filter_range_field(self, queryset, query_params, field_name):
        if field_name in query_params:
            values = query_params[field_name].split('_')
            if len(values) == 1:
                return queryset
            min_value, max_value = values[0], values[1]
            if not self.is_number(min_value) or not self.is_number(max_value):
                return queryset.none()
            min_value, max_value = Decimal(min_value), Decimal(max_value)
            if (min_value > max_value):
                min_value, max_value = max_value, min_value
            queryset = queryset.filter(
                **{f'{field_name}__range': (min_value, max_value)})
            query_params.pop(field_name)

        return queryset

    def apply_filter_match_all_id_foreign_field(self, queryset, query_params, field_name):
        if field_name in query_params:
            values = query_params[field_name].split('_')
            for value in values:
                queryset = queryset.filter(**{f'{field_name}__id': value})
            query_params.pop(field_name)

        return queryset

    def apply_filter_match_some_id_foreign_field(self, queryset, query_params, field_name):
        if field_name in query_params:
            values = query_params[field_name].split('_')
            queryset = queryset.filter(
                **{f'{field_name}__id__in': values}).distinct()
            print(len(queryset))
            query_params.pop(field_name)

        return queryset
