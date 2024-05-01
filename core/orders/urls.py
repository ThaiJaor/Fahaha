from django.urls import path
from . import views

urlpatterns = [
    path('vnpay-payment-url/',
         views.VnpayPaymentUrlView.as_view(), name='payment-url'),
    path('vnpay-response/',
         views.VnpayPaymentResponseView.as_view(), name='payment-response'),
    path('all-orders/', views.AllOrdersListView.as_view(), name='all-order-list'),
    path('orders/', views.OrderListView.as_view(), name='user-order-list'),
    path('order/<str:pk>/', views.OrderDetailView.as_view(), name='order-detail'),

]
