from django.db import models
import uuid


class Deal(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    deal_number = models.CharField(max_length=50, unique=True)

    deal_type = models.CharField(max_length=20)
    # RENT, SALE, MORTGAGE

    status = models.CharField(max_length=30, default="DRAFT")
    # DRAFT, SUBMITTED, UNDER_REVIEW, APPROVED, REJECTED, CONTRACT_ISSUED

    property = models.ForeignKey(
        "properties.Property",
        on_delete=models.CASCADE,
        related_name="deals"
    )

    created_by = models.UUIDField()

    created_at = models.DateTimeField(auto_now_add=True)
    approved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.deal_number
    
class DealParty(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    deal = models.ForeignKey(
        Deal,
        on_delete=models.CASCADE,
        related_name="parties"
    )

    citizen = models.ForeignKey(
        "citizens.Citizen",
        on_delete=models.CASCADE,
        related_name="deal_parties"
    )

    role = models.CharField(max_length=30)
    # OWNER, RENTER, BUYER, SELLER, WITNESS, MORTGAGE_GIVER, MORTGAGE_RECEIVER

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.deal.deal_number} - {self.role}"