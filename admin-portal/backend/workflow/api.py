from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import CitizenVerification, PropertyVerification, DealWorkflow


# =========================================================
# PENDING LISTS
# =========================================================

@api_view(["GET"])
@permission_classes([AllowAny])  # ✅ DEV SAFE (no 401)
def pending_citizens(request):
    data = CitizenVerification.objects.filter(status="PENDING")

    return Response([
        {
            "id": str(i.id),
            "citizen_id": str(i.citizen_id),
            "status": i.status,
        }
        for i in data
    ])


@api_view(["GET"])
@permission_classes([AllowAny])
def pending_properties(request):
    data = PropertyVerification.objects.filter(status="PENDING")

    return Response([
        {
            "id": str(i.id),
            "property_id": str(i.property_id),
            "status": i.status,
        }
        for i in data
    ])


@api_view(["GET"])
@permission_classes([AllowAny])
def pending_deals(request):
    data = DealWorkflow.objects.filter(status="PENDING")

    return Response([
        {
            "id": str(i.id),
            "deal_id": str(i.deal_id),
            "status": i.status,
        }
        for i in data
    ])


# =========================================================
# ACTIONS
# =========================================================

@api_view(["POST"])
@permission_classes([AllowAny])
def citizen_action(request, pk):
    try:
        obj = CitizenVerification.objects.get(id=pk)
        action = request.data.get("action")

        if action == "APPROVE":
            obj.status = "APPROVED"
        elif action == "REJECT":
            obj.status = "REJECTED"

        obj.save()

        return Response({
            "message": "citizen updated",
            "status": obj.status
        })

    except CitizenVerification.DoesNotExist:
        return Response({"error": "Citizen not found"}, status=404)


@api_view(["POST"])
@permission_classes([AllowAny])
def property_action(request, pk):
    try:
        obj = PropertyVerification.objects.get(id=pk)
        action = request.data.get("action")

        if action == "APPROVE":
            obj.status = "APPROVED"
        elif action == "REJECT":
            obj.status = "REJECTED"

        obj.save()

        return Response({
            "message": "property updated",
            "status": obj.status
        })

    except PropertyVerification.DoesNotExist:
        return Response({"error": "Property not found"}, status=404)


@api_view(["POST"])
@permission_classes([AllowAny])
def deal_workflow_action(request, deal_id):
    try:
        obj = DealWorkflow.objects.get(deal_id=deal_id)
        action = request.data.get("action")

        if action == "APPROVE":
            obj.status = "APPROVED"
        elif action == "REJECT":
            obj.status = "REJECTED"

        obj.save()

        return Response({
            "message": "deal updated",
            "status": obj.status
        })

    except DealWorkflow.DoesNotExist:
        return Response({"error": "Deal not found"}, status=404)