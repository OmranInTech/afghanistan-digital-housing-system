from rest_framework import serializers
from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [
            "id",
            "registration_number",
            "property_type",
            "total_area",
            "province",
            "district",
            "custom_address",
            "latitude",
            "longitude",
            "verification_status",
            "created_at",
            "updated_at"
        ]