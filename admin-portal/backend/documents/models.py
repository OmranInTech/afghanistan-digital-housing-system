import uuid
from django.db import models
from deals.models import Deal

class Document(models.Model):
    class DocType(models.TextChoices):
        NATIONAL_ID = "NATIONAL_ID", "National Identity Card"
        TITLE_DEED = "TITLE_DEED", "Official Title Deed"
        CONTRACT_IMAGE = "CONTRACT_IMAGE", "Signed Contract Signature"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    deal = models.ForeignKey(Deal, on_delete=models.CASCADE, related_name="documents")
    document_type = models.CharField(max_length=30, choices=DocType.choices)
    file = models.FileField(upload_to="registry_documents/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.document_type} for Deal {self.deal.id}"