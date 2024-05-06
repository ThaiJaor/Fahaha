from django.contrib import admin, messages
from django.http import HttpRequest
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
    list_display = ['user', 'id', 'created_at', 'updated_at']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['user__email', 'user__username', 'id']
    ordering = ['created_at', 'updated_at']

    readonly_fields = ['created_at', 'updated_at', 'total_price']

    actions = ['reset_cart']

    def reset_cart(self, request, queryset):
        for cart in queryset:
            cart.items.all().delete()
        self.message_user(request, 'All cart items were deleted.')
    reset_cart.short_description = 'Reset selected carts'

    # Custom message to display when a cart is deleted
    def message_user(self, request: HttpRequest, message: str, level: int = messages.INFO, extra_tags: str = '', fail_silently: bool = False):
        if 'was deleted' in message:
            message = f'The cart cannot be deleted because it is associated with a user.'
            level = messages.ERROR
        return super().message_user(request, message, level, extra_tags, fail_silently)

    def delete_model(self, request, obj):
        if not obj.user:
            obj.delete()


admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
