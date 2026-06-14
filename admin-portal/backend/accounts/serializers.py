from rest_framework import serializers
from django.contrib.auth import authenticate # Added this import
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


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    auth_code = serializers.CharField(required=False) # Made optional if not always needed

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        auth_code = data.get("auth_code")

        # Use email as the username for authentication
        user = authenticate(username=email, password=password)
        
        if user and user.is_active:
            # Check if auth_code is provided and matches
            if auth_code and hasattr(user, 'auth_code') and user.auth_code != auth_code:
                raise serializers.ValidationError("Invalid Auth Code")
            return user
        
        raise serializers.ValidationError("Invalid email or password")