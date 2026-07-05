from rest_framework import viewsets
from .models import Citizen
from .serializers import CitizenSerializer

class CitizenViewSet(viewsets.ModelViewSet):
    """
    Provides standard REST endpoints for managing citizens:
    GET /api/citizens/ - List all citizens
    POST /api/citizens/ - Create a new citizen profile
    GET /api/citizens/<id>/ - Retrieve details
    PUT /api/citizens/<id>/ - Update profile
    DELETE /api/citizens/<id>/ - Remove profile
    """
    queryset = Citizen.objects.all().order_by('-created_at')
    serializer_class = CitizenSerializer