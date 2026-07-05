from django.contrib import admin
from .models import Document

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ("id", "deal", "document_type", "uploaded_at")
    list_filter = ("document_type",)
    search_fields = ("deal__id",)