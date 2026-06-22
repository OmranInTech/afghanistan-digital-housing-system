from django.contrib import admin
from .models import RentalContract, SaleContract, MortgageContract

admin.site.register(RentalContract)
admin.site.register(SaleContract)
admin.site.register(MortgageContract)