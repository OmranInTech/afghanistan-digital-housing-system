import uuid
from django.db import models
from citizens.models import Citizen
from properties.models import Property

class Deal(models.Model):
    class DealType(models.TextChoices):
        RENTAL = "RENTAL", "Rental"
        SALE = "SALE", "Sale"
        MORTGAGE = "MORTGAGE", "Mortgage"

    class DealStatus(models.TextChoices):
        PENDING = "PENDING", "Pending Review"
        APPROVED = "APPROVED", "Approved"
        COMPLETED = "COMPLETED", "Completed"
        CANCELLED = "CANCELLED", "Cancelled"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    property = models.ForeignKey(Property, on_delete=models.PROTECT, related_name="deals")
    deal_type = models.CharField(max_length=20, choices=DealType.choices)
    status = models.CharField(max_length=20, choices=DealStatus.choices, default=DealStatus.PENDING)
    transaction_amount = models.DecimalField(max_digits=14, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.deal_type} ({self.status}) - Property: {self.property.registration_number}"


class DealParty(models.Model):
    class PartyRole(models.TextChoices):
        OWNER = "OWNER", "Property Owner"
        BUYER = "BUYER", "Buyer"
        RENTER = "RENTER", "Renter"
        LENDER = "LENDER", "Lender"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    deal = models.ForeignKey(Deal, on_delete=models.CASCADE, related_name="parties")
    citizen = models.ForeignKey(Citizen, on_delete=models.PROTECT, related_name="deal_roles")
    role = models.CharField(max_length=20, choices=PartyRole.choices)

    class Meta:
        unique_together = ('deal', 'citizen', 'role')

    def __str__(self):
        return f"{self.citizen.first_name} as {self.role} in Deal {self.deal.id}"


class RentalContract(models.Model):
    deal = models.OneToOneField(Deal, on_delete=models.CASCADE, related_name="rental_contract")
    start_date = models.DateField()
    end_date = models.DateField()
    monthly_rent = models.DecimalField(max_digits=12, decimal_places=2)
    security_deposit = models.DecimalField(max_digits=12, decimal_places=2)
    contract_file_url = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Rental Contract for Deal {self.deal.id}"


class SaleContract(models.Model):
    deal = models.OneToOneField(Deal, on_delete=models.CASCADE, related_name="sale_contract")
    transfer_date = models.DateField()
    payment_method = models.CharField(max_length=100)
    deed_reference_number = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"Sale Contract for Deal {self.deal.id}"


class MortgageContract(models.Model):
    deal = models.OneToOneField(Deal, on_delete=models.CASCADE, related_name="mortgage_contract")
    lender_name = models.CharField(max_length=150)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    duration_months = models.IntegerField()

    def __str__(self):
        return f"Mortgage Contract for Deal {self.deal.id}"