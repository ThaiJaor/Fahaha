from django.urls import path
from . import views
urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('info/', views.user_view, name='user_view'),
    path('change-password/', views.change_password_view, name='change_password')
]
