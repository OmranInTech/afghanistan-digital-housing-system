from django.contrib import admin
from .models import Property

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ("registration_number", "property_type", "total_area", "province", "verification_status")
    list_filter = ("verification_status", "property_type", "province")
    search_fields = ("registration_number", "province", "district")