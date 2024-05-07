from django.contrib import admin
from django.http import HttpRequest
from django.urls import path
from .models import AnalyticsRevenue, AnalyticsLoginHistory
from .views import revenue_view, login_history_view


class ChartView:
    def has_add_permission(self, request: HttpRequest):
        return False

    def has_change_permission(self, request: HttpRequest, obj=None):
        return False


class AnalyticsRevenueViewAdmin(ChartView, admin.ModelAdmin):
    model = AnalyticsRevenue

    def changelist_view(self, request, extra_context=None):
        return revenue_view(request)


class AnalyticsLoginHistoryViewAdmin(ChartView, admin.ModelAdmin):
    model = AnalyticsLoginHistory

    def changelist_view(self, request, extra_context=None):
        return login_history_view(request)


admin.site.register(AnalyticsRevenue, AnalyticsRevenueViewAdmin)
admin.site.register(AnalyticsLoginHistory, AnalyticsLoginHistoryViewAdmin)
