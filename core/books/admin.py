from django.contrib import admin
from .models import Book, Category, Publisher, Promotion


class BookAdmin(admin.ModelAdmin):

    list_display = ['title', 'id', 'author', 'publisher_name', 'sold', 'price', 'sale_price',
                    'created_at', 'promotion']

    list_filter = ['created_at', 'promotion', 'categories', 'publisher']
    search_fields = ['title', 'author', 'publisher_name', 'categories__name']
    ordering = ['created_at', 'sold', 'price', 'sale_price']

    readonly_fields = ['sale_price']

    filter_horizontal = ('categories',)

    def publisher_name(self, obj):
        return obj.publisher.name
    publisher_name.short_description = 'Publisher'


class BookInline(admin.TabularInline):
    model = Book
    extra = 0
    verbose_name = 'Book'
    verbose_name_plural = 'Books'
    show_change_link = True
    fields = ['id', 'title']
    readonly_fields = ['id', 'title']

    # prevent adding new books
    def has_add_permission(self, request, obj):
        return False


class PublisherAdmin(admin.ModelAdmin):
    inlines = [BookInline]
    list_display = ['name', 'id', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name']
    ordering = ['created_at']
    readonly_fields = ['created_at', 'updated_at']


class PromotionAdmin(admin.ModelAdmin):
    inlines = [BookInline]
    list_display = ['name', 'id',  'discount', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name']
    ordering = ['created_at', 'discount']
    readonly_fields = ['created_at', 'updated_at']


class BookInlineForCategory(admin.TabularInline):
    model = Book.categories.through
    extra = 0
    verbose_name = 'Book'
    verbose_name_plural = 'Books'
    show_change_link = True


class CategoryAdmin(admin.ModelAdmin):
    inlines = [BookInlineForCategory]
    list_display = ['name', 'id', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name']
    ordering = ['created_at']
    readonly_fields = ['created_at', 'updated_at']


admin.site.register(Book, BookAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Publisher, PublisherAdmin)
admin.site.register(Promotion, PromotionAdmin)
