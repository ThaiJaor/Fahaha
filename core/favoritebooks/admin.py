from django.contrib import admin
from .models import FavoriteBook


class FavoriteBookAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'book', 'created_at']
    search_fields = ['user', 'book']
    list_filter = ['created_at', 'user', 'book']
    readonly_fields = ['created_at']


admin.site.register(FavoriteBook, FavoriteBookAdmin)
