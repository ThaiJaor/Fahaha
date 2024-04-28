from django.urls import path
from . import views

urlpatterns = [
    path('vnpay-payment-url/',
         views.VnpayPaymentUrlView.as_view(), name='payment-url'),
    path('vnpay-response/',
         views.VnpayPaymentResponseView.as_view(), name='payment-response'),
]
