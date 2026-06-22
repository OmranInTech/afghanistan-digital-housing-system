from rest_framework import serializers
from .models import RentalContract, SaleContract, MortgageContract


class RentalContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentalContract
        fields = '__all__'


class SaleContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleContract
        fields = '__all__'


class MortgageContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = MortgageContract
        fields = '__all__'