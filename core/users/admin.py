from django.contrib.auth.models import Group
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from cart.models import Cart
from orders.models import Order


class CartInline(admin.TabularInline):
    model = Cart
    extra = 0
    verbose_name = 'Cart'
    verbose_name_plural = 'Carts'
    # readonly_fields = ['created_at', 'updated_at']
    can_delete = False  # Prevents deletion of MainModel instance
    show_change_link = True  # Add link to the change view of MainModel instance


class CustomUserAdmin(UserAdmin):
    # Define inlines
    inlines = [CartInline]

    # Define is_admin
    def is_admin(self, obj):
        return obj.is_superuser
    is_admin.boolean = True

    # Define list_display
    list_display = ['email', 'id', 'username', 'is_admin', 'date_joined',
                    'last_login']

    # Define fieldsets
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {
         'fields': ('username', 'first_name', 'last_name', 'phone_number', 'is_staff', 'is_superuser')}),
        ('Time info', {'fields': ('date_joined', 'last_login')}),
    )

    # Define add fieldsets
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'first_name', 'last_name', 'phone_number', 'password1', 'password2', 'is_staff', 'is_superuser'),
        }),
    )

    # Define ordering
    ordering = ['id']

    # Define Filter
    list_filter = ['is_superuser', 'date_joined', 'last_login']

    # Define search_fields
    search_fields = ['email', 'username']

    # Define readonly_fields
    readonly_fields = ['date_joined', 'last_login']

    # Define actions
    actions = ['make_admin', 'make_normal']

    def make_admin(self, request, queryset):
        queryset.update(is_superuser=True, is_staff=True)
        self.message_user(request, 'Selected users are now admin')
    make_admin.short_description = 'Make selected users admin'

    def make_normal(self, request, queryset):
        queryset.update(is_superuser=False, is_staff=False)
        self.message_user(request, 'Selected users are now normal users')
    make_normal.short_description = 'Make selected users normal'


admin.site.register(User, CustomUserAdmin)


# Unregister the Group model
admin.site.unregister(Group)
