from rest_framework import serializers
from .models import Agent
import json

class AgentRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = Agent
        fields = [
            "email", "password", "first_name", "last_name", "phone_number",
            "profile_picture", "id_number", "license_number", "location_text",
            "location_metrics", "auth_code",
        ]
        extra_kwargs = {'auth_code': {'required': False}}

    def validate(self, attrs):
        location_metrics = attrs.get("location_metrics")
        if location_metrics and isinstance(location_metrics, str):
            try:
                attrs["location_metrics"] = json.loads(location_metrics)
            except Exception:
                raise serializers.ValidationError({"location_metrics": "Invalid JSON format"})
        return attrs

    def create(self, validated_data):
        return Agent.objects.create_user(**validated_data)