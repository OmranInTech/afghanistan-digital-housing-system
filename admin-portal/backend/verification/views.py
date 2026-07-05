from rest_framework import viewsets
from .models import Verification
from .serializers import VerificationSerializer

class VerificationViewSet(viewsets.ModelViewSet):
    """
    Exposes raw verification entry points if direct mutation is needed.
    (Main automated operations execute inside deals/views.py)
    """
    queryset = Verification.objects.all()
    serializer_class = VerificationSerializer