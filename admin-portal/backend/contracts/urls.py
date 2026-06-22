from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RentalContractViewSet,
    SaleContractViewSet,
    MortgageContractViewSet
)

router = DefaultRouter()
router.register(r'rental-contracts', RentalContractViewSet)
router.register(r'sale-contracts', SaleContractViewSet)
router.register(r'mortgage-contracts', MortgageContractViewSet)

urlpatterns = [
    path('', include(router.urls)),
]