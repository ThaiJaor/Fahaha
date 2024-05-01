from django.urls import path
from . import views

urlpatterns = [
    path('cart/', views.CartListCreateView.as_view(), name='cart-list'),
    path('cart/<int:pk>/', views.CartDetailView.as_view(), name='cart-detail'),
    path('cart/<int:cart_id>/<int:item_id>/',
         views.CartItemDetailView.as_view(), name='cart-item-detail'),
]
