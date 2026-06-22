from django.urls import path
from .views import (
    CitizenVerificationViewSet,
    PropertyVerificationViewSet
)

from .api import (
    pending_citizens,
    pending_properties,
    pending_deals,
    citizen_action,
    property_action,
    deal_workflow_action,
)

urlpatterns = [
    # ---------------- ROUTERS ----------------
    path("", CitizenVerificationViewSet.as_view({"get": "list"})),
    
    # ---------------- PENDING QUEUES ----------------
    path("citizens/pending/", pending_citizens),
    path("properties/pending/", pending_properties),
    path("deals/pending/", pending_deals),

    # ---------------- ACTIONS ----------------
    path("citizen/<uuid:pk>/action/", citizen_action),
    path("property/<uuid:pk>/action/", property_action),
    path("deal/<uuid:deal_id>/action/", deal_workflow_action),
]