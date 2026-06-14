# accounts/urls.py
from django.urls import path
from .views import AgentRegistrationView  # Updated to match the class in views.py

urlpatterns = [
    path('api/v1/auth/register-agent/', AgentRegistrationView.as_view(), name='register_agent'),
]