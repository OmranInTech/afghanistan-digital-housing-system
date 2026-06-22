from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DealViewSet, DealPartyViewSet

router = DefaultRouter()
router.register(r'deals', DealViewSet)
router.register(r'deal-parties', DealPartyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]