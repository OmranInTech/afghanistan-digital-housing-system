from rest_framework import serializers
from .models import CitizenVerification, PropertyVerification


class CitizenVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CitizenVerification
        fields = "__all__"


class PropertyVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyVerification
        fields = "__all__"