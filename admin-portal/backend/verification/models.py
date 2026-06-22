from django.db import models
import uuid


class Verification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    deal = models.ForeignKey(
        "deals.Deal",
        on_delete=models.CASCADE,
        related_name="verifications"
    )

    verification_type = models.CharField(max_length=50)
    # ID_CHECK, PROPERTY_CHECK, FRAUD_CHECK, OWNERSHIP_CHECK

    result = models.CharField(max_length=20, default="PENDING")
    # PENDING, APPROVED, REJECTED

    verified_by = models.UUIDField(null=True, blank=True)

    verified_at = models.DateTimeField(null=True, blank=True)

    remarks = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)