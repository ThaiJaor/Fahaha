from django.shortcuts import render
from orders.models import Order
from login_history.models import LoginHistory
from datetime import datetime, timedelta


def revenue_view(request):

    orders = Order.objects.all()

    # total revenue for the last 7 days
    labels = []
    values_total_revenue = []
    values_total_count_orders = []
    for i in range(7):
        date = datetime.now() - timedelta(days=i)
        # print(date.strftime('%Y-%m-%d'))
        labels.append(date.strftime('%Y-%m-%d'))
        total = 0
        for order in orders:
            if order.created_at.date() == date.date():
                total += float(order.total_price)
        values_total_revenue.append(total)
        values_total_count_orders.append(
            orders.filter(created_at__date=date.date()).count())

    labels.reverse()
    values_total_revenue.reverse()
    values_total_count_orders.reverse()

    data = {
        'labels': labels,
        'values_total_revenue': values_total_revenue,
        'values_total_count_orders': values_total_count_orders,
        'title': 'Revenue Analytics',
        'site_title': 'Fahaha Admininstration',
        'site_header': 'Fahaha Admininstration',
    }
    return render(request, 'RevenueAnalytics.html', context=data)


def login_history_view(request):
    # Get all LoginHistory objects
    login_histories = LoginHistory.objects.all()
    # labels are the last 7 days
    labels = []
    values = []
    for i in range(7):
        date = datetime.now() - timedelta(days=i)
        labels.append(date.strftime('%Y-%m-%d'))
        total = login_histories.filter(
            date_time__date=date.date(), is_login=True).count()
        values.append(total)

    labels.reverse()
    values.reverse()

    data = {
        'labels': labels,
        'values': values,
        'title': 'Login History Analytics',
        'site_title': 'Fahaha Admininstration',
        'site_header': 'Fahaha Admininstration',
    }
    return render(request, 'LoginHistoryAnalytics.html', context=data)
