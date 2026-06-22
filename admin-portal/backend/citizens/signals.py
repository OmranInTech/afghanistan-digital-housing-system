from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender="citizens.Citizen")
def create_citizen_verification(sender, instance, created, **kwargs):
    if created:
        from workflow.models import CitizenVerification  # 👈 IMPORT INSIDE FUNCTION

        CitizenVerification.objects.create(
            citizen=instance,
            status="PENDING"
        )