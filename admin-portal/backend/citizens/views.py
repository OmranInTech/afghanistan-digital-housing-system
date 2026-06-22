from rest_framework import viewsets
from .models import Citizen
from .serializers import CitizenSerializer


class CitizenViewSet(viewsets.ModelViewSet):
    queryset = Citizen.objects.all().order_by('-created_at')
    serializer_class = CitizenSerializer