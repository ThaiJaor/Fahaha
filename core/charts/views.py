from django.shortcuts import render
from books.models import Category, Book


def custom_view(request):
    # Retrieve data for the chart from the Book model
    labels = []
    values = []

    # Perform any query/aggregation to fetch data
    # For example, let's count books per category
    categories = Category.objects.all()
    for category in categories:
        labels.append(category.name)
        count = category.books.count()
        values.append(count)

    # Prepare data to be sent as JSON
    data = {
        'labels': labels,
        'values': values,
        'title': 'Analytics',
    }
    return render(request, 'RevenueAnalytics.html', context=data)
