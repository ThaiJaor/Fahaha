from django.contrib import admin
from .models import Cart, CartItem


class CustomCartItemAdmin(admin.ModelAdmin):
    def get_readonly_fields(self, request, obj=None):
        return ['total_price', 'price', 'sale_price']


admin.site.register(Cart)
admin.site.register(CartItem)
