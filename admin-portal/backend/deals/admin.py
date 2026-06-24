from django.contrib import admin
from .models import DealTransaction

@admin.register(DealTransaction)
class DealTransactionAdmin(admin.ModelAdmin):
    list_display = ("id", "deal_type", "status", "agent", "created_at")
    list_filter = ("status", "deal_type")
    search_fields = ("id", "auth_code")