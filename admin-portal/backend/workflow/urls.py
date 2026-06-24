from django.urls import path
from .models import CitizenVerification, PropertyVerification, DealWorkflow
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.urls import path


from .api import (
    pending_citizens,
    pending_properties,
    pending_deals,
    citizen_action,
    property_action,
    deal_workflow_action,
)

urlpatterns = [
    path("citizens/pending/", pending_citizens),
    path("properties/pending/", pending_properties),
    path("deals/pending/", pending_deals),

    path("citizen/<uuid:pk>/action/", citizen_action),
    path("property/<uuid:pk>/action/", property_action),
    path("deal/<uuid:deal_id>/action/", deal_workflow_action),
]