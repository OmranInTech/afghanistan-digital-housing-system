from django.contrib import admin
from .models import Deal, DealParty, RentalContract, SaleContract, MortgageContract

class DealPartyInline(admin.TabularInline):
    model = DealParty
    extra = 1

@admin.register(Deal)
class DealAdmin(admin.ModelAdmin):
    list_display = ("id", "property", "deal_type", "status", "transaction_amount", "created_at")
    list_filter = ("deal_type", "status")
    inlines = [DealPartyInline]

admin.site.register(RentalContract)
admin.site.register(SaleContract)
admin.site.register(MortgageContract)