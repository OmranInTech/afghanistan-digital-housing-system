from rest_framework import serializers
from .models import Deal, DealParty


class DealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deal
        fields = '__all__'


class DealPartySerializer(serializers.ModelSerializer):
    class Meta:
        model = DealParty
        fields = '__all__'