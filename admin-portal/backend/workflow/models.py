from django.db import models
import uuid


# -------------------------
# CITIZEN VERIFICATION
# -------------------------
class CitizenVerification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    citizen = models.ForeignKey(
        "citizens.Citizen",
        on_delete=models.CASCADE,
        related_name="verifications"
    )

    status = models.CharField(max_length=20, default="PENDING")
    verified_by = models.UUIDField(null=True, blank=True)
    remarks = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)


# -------------------------
# PROPERTY VERIFICATION
# -------------------------
class PropertyVerification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    property = models.ForeignKey(
        "properties.Property",
        on_delete=models.CASCADE,
        related_name="verifications"
    )

    status = models.CharField(max_length=20, default="PENDING")
    verified_by = models.UUIDField(null=True, blank=True)
    remarks = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)


# -------------------------
# DEAL WORKFLOW (MISSING BEFORE)
# -------------------------
class DealWorkflow(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    deal = models.OneToOneField(
        "deals.Deal",
        on_delete=models.CASCADE,
        related_name="workflow"
    )

    status = models.CharField(max_length=30, default="PENDING")

    step_owner_verification = models.CharField(max_length=20, default="PENDING")
    step_property_verification = models.CharField(max_length=20, default="PENDING")
    step_renter_verification = models.CharField(max_length=20, default="PENDING")

    final_decision = models.CharField(max_length=20, default="NOT_DECIDED")

    created_at = models.DateTimeField(auto_now_add=True)