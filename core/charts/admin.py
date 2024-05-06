from django.contrib import admin
from django.urls import path
from .models import AnalyticsRevenue
from .views import custom_view


class RevenueAnalyticsViewAdmin(admin.ModelAdmin):
    model = AnalyticsRevenue

    # def get_urls(self):
    #     view_name = '{}_{}_changelist'.format(
    #         self.model._meta.app_label, self.model._meta.model_name)
    #     return [
    #         path('revenue_analytics/', custom_view, name=view_name),
    #     ]

    def changelist_view(self, request, extra_context=None):
        return custom_view(request)


admin.site.register(AnalyticsRevenue, RevenueAnalyticsViewAdmin)
