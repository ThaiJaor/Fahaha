from django.contrib import admin
from .models import Rating
# Register your models here.


class RatingAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'book', 'rating', 'created_at']
    list_filter = ['created_at', 'user']
    search_fields = ['user__email', 'user__username', 'book__title', 'rating']
    ordering = ['created_at', 'rating']
    readonly_fields = ['created_at', 'updated_at']

    actions = ['set_rating_1', 'set_rating_2',
               'set_rating_3', 'set_rating_4', 'set_rating_5']

    def set_rating_1(self, request, queryset):
        queryset.update(rating=1)
        self.message_user(request, 'Selected ratings are now 1')
    set_rating_1.short_description = 'Set selected ratings to 1'

    def set_rating_2(self, request, queryset):
        queryset.update(rating=2)
        self.message_user(request, 'Selected ratings are now 2')
    set_rating_2.short_description = 'Set selected ratings to 2'

    def set_rating_3(self, request, queryset):
        queryset.update(rating=3)
        self.message_user(request, 'Selected ratings are now 3')
    set_rating_3.short_description = 'Set selected ratings to 3'

    def set_rating_4(self, request, queryset):
        queryset.update(rating=4)
        self.message_user(request, 'Selected ratings are now 4')
    set_rating_4.short_description = 'Set selected ratings to 4'

    def set_rating_5(self, request, queryset):
        queryset.update(rating=5)
        self.message_user(request, 'Selected ratings are now 5')
    set_rating_5.short_description = 'Set selected ratings to 5'


admin.site.register(Rating, RatingAdmin)
