from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from citizens.models import Citizen
from properties.models import Property
from deals.models import Deal

from workflow.models import (
    CitizenVerification,
    PropertyVerification,
    DealWorkflow
)

# =========================================================
# 📊 DASHBOARD SUMMARY (TOP STATS CARDS)
# =========================================================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard_summary(request):

    return Response({
        "citizens": {
            "total": Citizen.objects.count(),
            "pending": CitizenVerification.objects.filter(status="PENDING").count(),
            "approved": CitizenVerification.objects.filter(status="APPROVED").count(),
            "rejected": CitizenVerification.objects.filter(status="REJECTED").count(),
        },

        "properties": {
            "total": Property.objects.count(),
            "pending": PropertyVerification.objects.filter(status="PENDING").count(),
            "approved": PropertyVerification.objects.filter(status="APPROVED").count(),
            "rejected": PropertyVerification.objects.filter(status="REJECTED").count(),
        },

        "deals": {
            "total": Deal.objects.count(),
            "pending": DealWorkflow.objects.filter(status="PENDING").count(),
            "under_review": DealWorkflow.objects.filter(status="UNDER_REVIEW").count(),
            "approved": DealWorkflow.objects.filter(status="APPROVED").count(),
            "rejected": DealWorkflow.objects.filter(status="REJECTED").count(),
        }
    })


# =========================================================
# 🧍 PENDING CITIZENS QUEUE
# =========================================================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def pending_citizens(request):

    data = CitizenVerification.objects.filter(status="PENDING")

    return Response([
        {
            "id": str(i.id),
            "citizen_id": str(i.citizen_id),
            "citizen_name": f"{i.citizen.first_name} {i.citizen.last_name}",
            "status": i.status,
            "created_at": i.created_at,
        }
        for i in data
    ])


# =========================================================
# 🏠 PENDING PROPERTIES QUEUE
# =========================================================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def pending_properties(request):

    data = PropertyVerification.objects.filter(status="PENDING")

    return Response([
        {
            "id": str(i.id),
            "property_id": str(i.property_id),
            "property_number": i.property.property_number if hasattr(i.property, "property_number") else None,
            "status": i.status,
            "created_at": i.created_at,
        }
        for i in data
    ])


# =========================================================
# 💼 PENDING DEALS QUEUE
# =========================================================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def pending_deals(request):

    data = DealWorkflow.objects.filter(status="PENDING")

    return Response([
        {
            "id": str(i.id),
            "deal_id": str(i.deal_id),
            "status": i.status,
            "owner_step": i.step_owner_verification,
            "property_step": i.step_property_verification,
            "renter_step": i.step_renter_verification,
            "final_decision": i.final_decision,
            "created_at": i.created_at,
        }
        for i in data
    ])