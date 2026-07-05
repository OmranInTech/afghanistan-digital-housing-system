import uuid
from django.db import models
from deals.models import Deal

class Verification(models.Model):
    class VerificationStatus(models.TextChoices):
        PENDING = "PENDING", "Pending Review"
        PASSED = "PASSED", "Passed"
        FAILED = "FAILED", "Failed"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    deal = models.OneToOneField(Deal, on_delete=models.CASCADE, related_name="verification")
    id_database_match = models.CharField(max_length=20, choices=VerificationStatus.choices, default=VerificationStatus.PENDING)
    property_boundary_match = models.CharField(max_length=20, choices=VerificationStatus.choices, default=VerificationStatus.PENDING)
    officer_notes = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Verification for Deal {self.deal.id}"