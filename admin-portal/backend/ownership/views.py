from rest_framework import viewsets
from .models import PropertyOwnership
from .serializers import PropertyOwnershipSerializer


class PropertyOwnershipViewSet(viewsets.ModelViewSet):
    queryset = PropertyOwnership.objects.all().order_by('-created_at')
    serializer_class = PropertyOwnershipSerializer