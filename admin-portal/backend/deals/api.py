from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import DealTransaction

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_deal(request):
    deal = DealTransaction.objects.create(
        agent=request.user.agent,
        deal_type=request.data.get("deal_type"),
        auth_code=request.data.get("auth_code"),
        status="DRAFT",
    )

    return Response({
        "deal_id": str(deal.id),
        "status": deal.status
    })