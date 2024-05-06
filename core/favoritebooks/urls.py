from django.urls import path
from . import views

urlpatterns = [
    path('favoritebooks/', views.FavoriteBookListCreateView.as_view(), name='favorite-books'),
    path('favoritebooks/<int:pk>/', views.FavoriteBookDetailDestroyView.as_view(), name='favorite-books-detail')
]