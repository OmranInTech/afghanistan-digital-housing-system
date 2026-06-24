# config/urls.py (or your main project urls.py)
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')), # This routes to accounts/urls.py
    path('api/', include('citizens.urls')),
    path('api/', include('properties.urls')),
    path('api/', include('ownership.urls')),
    path('api/', include('deals.urls')),
    path('api/', include('contracts.urls')),
    path('api/', include('documents.urls')),
    path('api/', include('verification.urls')),
    path('api/workflow/', include('workflow.urls')),

]
