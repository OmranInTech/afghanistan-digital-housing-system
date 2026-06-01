# accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class SalesAgentRegistrationSerializer(serializers.ModelSerializer):
    # Map React interface parameters to Python model structures cleanly
    firstName = serializers.CharField(source='first_name')
    lastName = serializers.CharField(source='last_name')
    govCode = serializers.CharField(source='gov_code')
    idNumber = serializers.CharField(source='id_number')
    licenseNumber = serializers.CharField(source='license_number', required=False, allow_blank=True)
    locationMetrics = serializers.CharField(source='location_metrics')

    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'firstName', 'lastName',
            'govCode', 'role', 'idNumber', 'licenseNumber', 'locationMetrics'
        ]
        extra_kwargs = {
            'password': {'write_only': True} # Completely blocks password from reading vectors
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("An account with this email address already exists.")
        return value

    def create(self, validated_data):
        # Extract and compile password using Django's cryptographically secure hashing layers
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user