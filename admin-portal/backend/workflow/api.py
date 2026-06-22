from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CitizenVerification, PropertyVerification, DealWorkflow
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CitizenVerification, PropertyVerification, DealWorkflow


# -------------------------
# PENDING QUEUE APIs
# -------------------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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