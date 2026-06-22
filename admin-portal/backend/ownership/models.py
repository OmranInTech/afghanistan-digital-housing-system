from django.db import models
import uuid


class PropertyOwnership(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    property = models.ForeignKey(
        "properties.Property",
        on_delete=models.CASCADE,
        related_name="ownerships"
    )

    citizen = models.ForeignKey(
        "citizens.Citizen",
        on_delete=models.CASCADE,
        related_name="property_ownerships"
    )

    ownership_percentage = models.FloatField()

    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    is_current = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.property.property_number} - {self.citizen.first_name}"