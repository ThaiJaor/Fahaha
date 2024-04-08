from django.urls import path
from . import views

urlpatterns = [
    path('books/', views.BookListCreateView.as_view(), name='book-list'),
    path('books/<int:pk>/', views.BookDetailView.as_view(), name='book-detail'),
    path('categories/', views.CategoryListCreateView.as_view(), name='category-list'),
    path('categories/<int:pk>/', views.CategoryDetailView.as_view(),
         name='category-detail'),
    path('publishers/', views.PublisherListCreateView.as_view(),
         name='publisher-list'),
    path('publishers/<int:pk>/', views.PublisherDetailView.as_view(),
         name='publisher-detail'),
    path('promotions/', views.PromotionListCreateView.as_view(),
         name='promotion-list'),
    path('promotions/<int:pk>/', views.PromotionDetailView.as_view(),
         name='promotion-detail'),
]
