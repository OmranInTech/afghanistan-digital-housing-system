from rest_framework import viewsets
from .models import Verification
from .serializers import VerificationSerializer


class VerificationViewSet(viewsets.ModelViewSet):
    queryset = Verification.objects.all().order_by('-created_at')
    serializer_class = VerificationSerializer