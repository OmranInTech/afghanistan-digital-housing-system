from rest_framework import serializers
from .models import Citizen

class CitizenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Citizen
        fields = [
            "id",
            "national_id",
            "first_name",
            "last_name",
            "father_name",
            "grandfather_name",
            "gender",
            "date_of_birth",
            "phone",
            "email",
            "province",
            "district",
            "village",
            "current_address",
            "is_verified",
            "created_at",
            "updated_at"
        ]