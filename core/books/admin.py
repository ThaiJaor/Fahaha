from django.contrib import admin
from .models import Book, Category, Publisher, Promotion
# Register your models here.

admin.site.register(Category)
admin.site.register(Publisher)
admin.site.register(Promotion)


class BookAdmin(admin.ModelAdmin):
    def get_readonly_fields(self, request, obj=None):
        return ['discounted_price']


admin.site.register(Book, BookAdmin)
