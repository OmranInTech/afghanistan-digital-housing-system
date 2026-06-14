# config/urls.py (or your main project urls.py)
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')), # This routes to accounts/urls.py
]