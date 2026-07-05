from rest_framework import serializers
from .models import Verification

class VerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Verification
        fields = [
            "id",
            "deal",
            "id_database_match",
            "property_boundary_match",
            "officer_notes",
            "updated_at"
        ]