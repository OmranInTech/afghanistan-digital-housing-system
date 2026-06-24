# deals/models.py

import uuid
from django.db import models


class DealTransaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    DEAL_TYPES = (
        ("RENT", "RENT"),
        ("SALE", "SALE"),
        ("MORTGAGE", "MORTGAGE"),
    )

    deal_type = models.CharField(max_length=20, choices=DEAL_TYPES)

    agent = models.ForeignKey(
        "accounts.Agent",   # or settings.AUTH_USER_MODEL if needed
        on_delete=models.CASCADE
    )

    status = models.CharField(max_length=20, default="PENDING")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.deal_type} - {self.id}"