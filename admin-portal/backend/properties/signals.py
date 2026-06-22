from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender="properties.Property")
def create_property_verification(sender, instance, created, **kwargs):
    if created:
        from workflow.models import PropertyVerification  # lazy import

        PropertyVerification.objects.create(
            property=instance,
            status="PENDING"
        )