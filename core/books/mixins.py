
class FilterMixin:
    def apply_filter_range_field(self, queryset, query_params, field_name):
        if f'{field_name}_min' in query_params:
            queryset = queryset.filter(
                **{f'{field_name}__gte': query_params[f'{field_name}_min']})
            query_params.pop(f'{field_name}_min')

        if f'{field_name}_max' in query_params:
            queryset = queryset.filter(
                **{f'{field_name}__lte': query_params[f'{field_name}_max']})
            query_params.pop(f'{field_name}_max')

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
