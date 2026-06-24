from django.urls import path
from .api import create_deal

urlpatterns = [
    path("create/", create_deal),
]