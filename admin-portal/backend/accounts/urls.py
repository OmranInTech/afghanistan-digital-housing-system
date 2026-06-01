# accounts/urls.py
from django.urls import path
from .views import RegisterSalesAgentView

urlpatterns = [
    path('api/v1/auth/register-agent/', RegisterSalesAgentView.as_view(), name='register_agent'),
]