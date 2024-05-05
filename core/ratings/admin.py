from django.contrib import admin
from .models import Rating
# Register your models here.


class CustomRatingAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'book', 'rating', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__email', 'user__username', 'book__title', 'rating']
    ordering = ['created_at', 'rating']
    readonly_fields = ['created_at']


admin.site.register(Rating, CustomRatingAdmin)
