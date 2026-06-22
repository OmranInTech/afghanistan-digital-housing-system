from rest_framework import viewsets
from .models import RentalContract, SaleContract, MortgageContract
from .serializers import (
    RentalContractSerializer,
    SaleContractSerializer,
    MortgageContractSerializer
)


class RentalContractViewSet(viewsets.ModelViewSet):
    queryset = RentalContract.objects.all()
    serializer_class = RentalContractSerializer


class SaleContractViewSet(viewsets.ModelViewSet):
    queryset = SaleContract.objects.all()
    serializer_class = SaleContractSerializer


class MortgageContractViewSet(viewsets.ModelViewSet):
    queryset = MortgageContract.objects.all()
    serializer_class = MortgageContractSerializer