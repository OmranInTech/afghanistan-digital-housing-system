from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Unified Core Routing Manifest
    path('api/', include('deals.urls')),
    path('api/', include('citizens.urls')),
    path('api/', include('properties.urls')),
    path('api/', include('documents.urls')),
    path('api/', include('verification.urls')),

    path('', include('accounts.urls')),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)