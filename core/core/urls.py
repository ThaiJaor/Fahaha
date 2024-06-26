"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from django.shortcuts import redirect


admin.site.site_header = 'Fahaha Admininstration'
admin.site.site_title = 'Fahaha Admininstration'


urlpatterns = [
    # view site will redirect to localhost:3000
    path('', lambda request: redirect('http://localhost:3000/'), name='home'),
    path('admin/', admin.site.urls),
    path('api/user/', include('users.urls')),
    path('api/', include('books.urls')),
    path('api/', include('orders.urls')),
    path('api/', include('cart.urls')),
    path('api/', include('ratings.urls')),
    path('api/', include('recommendations.urls')),
    path('api/', include('favoritebooks.urls')),
    path('api/', include('chatbox.urls')),
    # YOUR PATTERNS
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('api/schema/swagger-ui/',
         SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/',
         SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('login-history/', include('login_history.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
