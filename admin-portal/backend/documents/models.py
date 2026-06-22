from django.db import models

# Create your models here.
from django.db import models
import uuid


class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    deal = models.ForeignKey(
        "deals.Deal",
        on_delete=models.CASCADE,
        related_name="documents",
        null=True,
        blank=True
    )

    property = models.ForeignKey(
        "properties.Property",
        on_delete=models.CASCADE,
        related_name="documents",
        null=True,
        blank=True
    )

    citizen = models.ForeignKey(
        "citizens.Citizen",
        on_delete=models.CASCADE,
        related_name="documents",
        null=True,
        blank=True
    )

    document_type = models.CharField(max_length=50)
    # NATIONAL_ID, DEED, CONTRACT_PDF, PHOTO, COURT_ORDER

    file_url = models.TextField()

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.document_type