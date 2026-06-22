from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender="deals.Deal")
def create_deal_workflow(sender, instance, created, **kwargs):
    if created:
        from workflow.models import DealWorkflow

        DealWorkflow.objects.create(
            deal=instance,
            status="PENDING"
        )