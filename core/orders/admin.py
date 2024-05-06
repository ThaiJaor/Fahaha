from django.contrib import admin
from .models import Order
from django.utils.safestring import mark_safe


class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'created_at',
                    'status', 'total_price', 'payment_method']
    list_filter = ['created_at', 'status', 'payment_method', 'user']
    search_fields = ['user__email', 'user__username',
                     'id', 'status', 'payment_method']
    ordering = ['created_at', 'status', 'total_price']
    actions = ['mark_as_delivered', 'mark_as_cancelled', 'mark_as_processing']

    def mark_as_processing(self, request, queryset):
        queryset.update(status='processing')
        self.message_user(request, 'Selected orders are now processing')
    mark_as_processing.short_description = 'Mark selected orders as processing'

    def mark_as_shipping(self, request, queryset):
        queryset.update(status='shipping')
        self.message_user(request, 'Selected orders are now shipping')
    mark_as_shipping.short_description = 'Mark selected orders as shipping'

    def mark_as_delivered(self, request, queryset):
        queryset.update(status='delivered')
        self.message_user(request, 'Selected orders are now delivered')
    mark_as_delivered.short_description = 'Mark selected orders as delivered'

    def mark_as_cancelled(self, request, queryset):
        queryset.update(status='cancelled')
        self.message_user(request, 'Selected orders are now cancelled')
    mark_as_cancelled.short_description = 'Mark selected orders as cancelled'

    readonly_fields = ['total_price',
                       'display_items', 'created_at', 'updated_at']

    def display_items(self, obj):
        items_data = obj.items
        total_price = obj.total_price
        payment_amount = obj.payment_amount
        payment_currency = obj.payment_currency
        formatted_items = "<table border='1'><tr>\
                                <th>ID</th>\
                                <th>Title</th>\
                                <th>Quantity</th>\
                                <th>Price</th>\
                                <th>Sale Price</th>\
                                <th>Discount</th>\
                                <th>Total Price</th>\
                                </tr>"
        for item in items_data:
            formatted_item = (
                f"<tr><td>{item['item_id']}</td>"
                f"<td>{item['title']}</td>"
                f"<td>{item['quantity']}</td>"
                f"<td>{item['price']}</td>"
                f"<td>{item['sale_price']}</td>"
                f"<td>{item['discount']}</td>"
                f"<td>{item['total_price']}</td></tr>"
            )
            formatted_items += formatted_item
            # total_price += float(item['total_price'])  # Calculate total price
        formatted_items += (
            f"<tr><td colspan='6' align='right'><b>Total Price:</b></td>"
            f"<td>{total_price:.2f} $</td></tr>"
        )
        formatted_items += (
            f"<tr><td colspan='6' align='right'><b>Payment amount:</b></td>"
            f"<td>{payment_amount:.2f} {payment_currency}</td></tr>"
        )
        formatted_items += "</table>"
        # Mark the string as safe for HTML rendering
        return mark_safe(formatted_items)

    display_items.short_description = 'Items'



admin.site.register(Order, OrderAdmin)
