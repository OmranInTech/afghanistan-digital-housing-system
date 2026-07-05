from rest_framework import viewsets
from .models import Property
from .serializers import PropertySerializer

class PropertyViewSet(viewsets.ModelViewSet):
    """
    Handles property registry details:
    GET /api/properties/ - List all registered lands/buildings
    POST /api/properties/ - Add a physical asset profile
    """
    queryset = Property.objects.all().order_by('-created_at')
    serializer_class = PropertySerializer