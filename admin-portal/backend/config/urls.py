# config/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # FIX: Remove the "admin.site.split or" typo
    path('admin/', admin.site.urls),
    
    # Include your accounts routes
    path('', include('accounts.urls')),
]