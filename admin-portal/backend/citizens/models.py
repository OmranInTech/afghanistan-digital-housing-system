from django.db import models
import uuid


class Citizen(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    national_id = models.CharField(max_length=50, unique=True)

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    father_name = models.CharField(max_length=100)

    phone = models.CharField(max_length=20)
    email = models.EmailField(null=True, blank=True)

    date_of_birth = models.DateField()

    address = models.TextField()
    photo = models.TextField(null=True, blank=True)

    status = models.CharField(max_length=20, default="ACTIVE")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"