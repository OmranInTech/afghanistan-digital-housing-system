from rest_framework.decorators import api_view
from rest_framework.response import Response
from .permissions import IsAdminOrInspector
from rest_framework.decorators import api_view, permission_classes

from .services import (
    update_citizen_verification,
    update_property_verification,
    update_deal_workflow
)


# -------------------------
# CITIZEN APPROVAL API
# -------------------------
@api_view(["POST"])
def citizen_action(request, pk):
    status = request.data.get("status")
    remarks = request.data.get("remarks")

    obj = update_citizen_verification(pk, status, remarks)

    return Response({
        "message": "Citizen updated",
        "id": str(obj.id),
        "status": obj.status
    })


# -------------------------
# PROPERTY APPROVAL API
# -------------------------
@api_view(["POST"])
def property_action(request, pk):
    status = request.data.get("status")
    remarks = request.data.get("remarks")

    obj = update_property_verification(pk, status, remarks)

    return Response({
        "message": "Property updated",
        "id": str(obj.id),
        "status": obj.status
    })


# -------------------------
# DEAL UPDATE API
# -------------------------
@api_view(["POST"])
def deal_workflow_action(request, deal_id):
    steps = request.data

    obj = update_deal_workflow(deal_id, **steps)

    return Response({
        "message": "Deal workflow updated",
        "deal_id": str(obj.deal_id),
        "status": obj.status
    })