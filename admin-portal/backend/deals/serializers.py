from rest_framework import serializers
from citizens.models import Citizen
from .models import Deal, DealParty, RentalContract, SaleContract, MortgageContract

class DealPartySerializer(serializers.ModelSerializer):
    citizen_name = serializers.CharField(source='citizen.first_name', read_only=True)
    citizen_last = serializers.CharField(source='citizen.last_name', read_only=True)
    national_id = serializers.CharField(source='citizen.national_id', read_only=True)

    class Meta:
        model = DealParty
        fields = ["citizen", "citizen_name", "citizen_last", "national_id", "role"]


class RentalContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentalContract
        fields = "__all__"


class SaleContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleContract
        fields = "__all__"


class MortgageContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = MortgageContract
        fields = "__all__"


class UnifiedDashboardRowSerializer(serializers.ModelSerializer):
    property_reg = serializers.CharField(source='property.registration_number', read_only=True)
    property_type = serializers.CharField(source='property.property_type', read_only=True)
    parties = DealPartySerializer(many=True, read_only=True)
    rental_details = RentalContractSerializer(source='rental_contract', read_only=True)
    sale_details = SaleContractSerializer(source='sale_contract', read_only=True)
    mortgage_details = MortgageContractSerializer(source='mortgage_contract', read_only=True)
    id_verified = serializers.SerializerMethodField()
    property_verified = serializers.SerializerMethodField()

    class Meta:
        model = Deal
        fields = [
            "id", "deal_type", "status", "transaction_amount", 
            "property_reg", "property_type", "parties",
            "rental_details", "sale_details", "mortgage_details",
            "id_verified", "property_verified", "created_at"
        ]

    def get_id_verified(self, obj):
        return obj.verification.id_database_match if hasattr(obj, 'verification') else "PENDING"

    def get_property_verified(self, obj):
        return obj.verification.property_boundary_match if hasattr(obj, 'verification') else "PENDING"


class MobileDealIngestSerializer(serializers.ModelSerializer):
    owner_id = serializers.PrimaryKeyRelatedField(queryset=Citizen.objects.all(), write_only=True)
    client_id = serializers.PrimaryKeyRelatedField(queryset=Citizen.objects.all(), write_only=True)
    client_role = serializers.ChoiceField(choices=["BUYER", "RENTER", "LENDER"], write_only=True)

    class Meta:
        model = Deal
        fields = ["id", "property", "deal_type", "transaction_amount", "owner_id", "client_id", "client_role", "status"]

    def create(self, validated_data):
        from verification.models import Verification
        
        owner = validated_data.pop('owner_id')
        client = validated_data.pop('client_id')
        client_role = validated_data.pop('client_role')
        
        deal = Deal.objects.create(**validated_data)
        
        # Atomically link participants via the DealParty junction layout
        DealParty.objects.create(deal=deal, citizen=owner, role="OWNER")
        DealParty.objects.create(deal=deal, citizen=client, role=client_role)
        
        # Open an empty verification ticket automatically
        Verification.objects.create(deal=deal)
        
        return deal