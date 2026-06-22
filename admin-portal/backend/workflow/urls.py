from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import CitizenVerificationViewSet, PropertyVerificationViewSet

from .api import (
    citizen_action,
    property_action,
    deal_workflow_action
)

from .dashboard_api import (
    dashboard_summary,
    pending_citizens,
    pending_properties,
    pending_deals
)

# -------------------------
# ROUTER (CRUD APIs)
# -------------------------
router = DefaultRouter()
router.register(r"citizens", CitizenVerificationViewSet)
router.register(r"properties", PropertyVerificationViewSet)

# -------------------------
# URL PATTERNS
# -------------------------
urlpatterns = [
    # CRUD APIs
    path("", include(router.urls)),

    # -------------------------
    # WORKFLOW ACTION APIs
    # -------------------------
    path("citizen/<uuid:pk>/action/", citizen_action),
    path("property/<uuid:pk>/action/", property_action),
    path("deal/<uuid:deal_id>/action/", deal_workflow_action),

    # -------------------------
    # DASHBOARD APIs
    # -------------------------
    path("dashboard/summary/", dashboard_summary),
    path("dashboard/pending/citizens/", pending_citizens),
    path("dashboard/pending/properties/", pending_properties),
    path("dashboard/pending/deals/", pending_deals),
]