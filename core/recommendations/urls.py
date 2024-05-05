from django.urls import path
from . import views

urlpatterns = [
    path('recommendations-user/',
         views.RecommendationForUserView.as_view(), name='recommendations-user'),
    path('recommendations-book/<int:pk>/',
         views.RecommendationForBookView.as_view(), name='recommendations-book'),
]