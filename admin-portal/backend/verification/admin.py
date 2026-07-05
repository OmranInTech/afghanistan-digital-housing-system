from django.contrib import admin
from .models import Verification

@admin.register(Verification)
class VerificationAdmin(admin.ModelAdmin):
    list_display = ("deal", "id_database_match", "property_boundary_match", "updated_at")
    list_filter = ("id_database_match", "property_boundary_match")