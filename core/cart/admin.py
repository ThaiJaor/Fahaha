from django.contrib import admin
from .models import Cart, CartItem


class CartItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'cart', 'book',
                    'quantity', 'created_at', 'updated_at']
    list_filter = ['created_at', 'updated_at', 'cart']
    search_fields = ['cart__id', 'book__title', 'book__id']
    ordering = ['created_at', 'updated_at']

    readonly_fields = ['created_at', 'updated_at']


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    verbose_name = 'Cart Item'
    verbose_name_plural = 'Cart Items'


class CartAdmin(admin.ModelAdmin):
    inlines = [CartItemInline]
    list_display = ['id', 'user', 'created_at', 'updated_at']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['user__email', 'user__username', 'id']
    ordering = ['created_at', 'updated_at']

    readonly_fields = ['created_at', 'updated_at']


admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
