from django.db import models
import uuid


# ------------------------
# RENTAL CONTRACT
# ------------------------
class RentalContract(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    deal = models.OneToOneField(
        "deals.Deal",
        on_delete=models.CASCADE,
        related_name="rental_contract"
    )

    start_date = models.DateField()
    end_date = models.DateField()

    monthly_rent = models.FloatField()
    deposit_amount = models.FloatField()

    payment_frequency = models.CharField(max_length=20, default="MONTHLY")

    created_at = models.DateTimeField(auto_now_add=True)


# ------------------------
# SALE CONTRACT
# ------------------------
class SaleContract(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    deal = models.OneToOneField(
        "deals.Deal",
        on_delete=models.CASCADE,
        related_name="sale_contract"
    )

    sale_price = models.FloatField()

    payment_method = models.CharField(max_length=50)

    ownership_transfer_date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)


# ------------------------
# MORTGAGE CONTRACT
# ------------------------
class MortgageContract(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    deal = models.OneToOneField(
        "deals.Deal",
        on_delete=models.CASCADE,
        related_name="mortgage_contract"
    )

    mortgage_amount = models.FloatField()

    start_date = models.DateField()
    end_date = models.DateField()

    return_conditions = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)