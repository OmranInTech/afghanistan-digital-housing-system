from django.contrib import admin
from .models import Citizen

@admin.register(Citizen)
class CitizenAdmin(admin.ModelAdmin):
    list_display = ("national_id", "first_name", "last_name", "province", "is_verified", "created_at")
    list_filter = ("is_verified", "gender", "province")
    search_fields = ("national_id", "first_name", "last_name", "phone")