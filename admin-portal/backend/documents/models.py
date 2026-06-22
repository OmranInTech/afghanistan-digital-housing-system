from django.db import models
import uuid


class Document(models.Model):

    DOCUMENT_TYPES = [
        ("NATIONAL_ID", "National ID"),
        ("PROPERTY_DEED", "Property Deed"),
        ("CONTRACT_PDF", "Contract PDF"),
        ("PHOTO", "Photo"),
        ("COURT_ORDER", "Court Order"),
        ("WITNESS_LETTER", "Witness Letter"),
        ("OTHER", "Other"),
    ]

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

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

    document_type = models.CharField(
        max_length=50,
        choices=DOCUMENT_TYPES
    )

    file = models.FileField(
        upload_to="documents/",
        null=True,
        blank=True
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.document_type} - {self.id}"