from rest_framework import viewsets
from .models import Deal, DealParty
from .serializers import DealSerializer, DealPartySerializer


class DealViewSet(viewsets.ModelViewSet):
    queryset = Deal.objects.all().order_by('-created_at')
    serializer_class = DealSerializer


class DealPartyViewSet(viewsets.ModelViewSet):
    queryset = DealParty.objects.all().order_by('-created_at')
    serializer_class = DealPartySerializer