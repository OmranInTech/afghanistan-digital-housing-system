from rest_framework import viewsets
from .models import CitizenVerification, PropertyVerification
from .serializers import CitizenVerificationSerializer, PropertyVerificationSerializer


# -------------------------
# CITIZEN VERIFICATION API
# -------------------------
class CitizenVerificationViewSet(viewsets.ModelViewSet):
    queryset = CitizenVerification.objects.all()
    serializer_class = CitizenVerificationSerializer


# -------------------------
# PROPERTY VERIFICATION API
# -------------------------
class PropertyVerificationViewSet(viewsets.ModelViewSet):
    queryset = PropertyVerification.objects.all()
    serializer_class = PropertyVerificationSerializer