from django.urls import path
from . import views

urlpatterns = [
    path('cart-list/', views.CartListView.as_view(), name='cart-list'),
    path('cart/', views.CartDetailView.as_view(), name='cart-detail'),
    path('cart/<int:item_id>/',
         views.CartItemDetailView.as_view(), name='cart-item-detail'),
]
