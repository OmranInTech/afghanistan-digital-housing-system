from django.db import models
import uuid


class Property(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    property_number = models.CharField(max_length=50, unique=True)

    province = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    village = models.CharField(max_length=100, blank=True, null=True)
    street = models.CharField(max_length=100, blank=True, null=True)
    house_number = models.CharField(max_length=50, blank=True, null=True)

    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    property_type = models.CharField(max_length=50)
    # HOUSE, APARTMENT, LAND

    land_area = models.FloatField(null=True, blank=True)
    building_area = models.FloatField(null=True, blank=True)

    ownership_status = models.CharField(max_length=50, default="UNKNOWN")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.property_number