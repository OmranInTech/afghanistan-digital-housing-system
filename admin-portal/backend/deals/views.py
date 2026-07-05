from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import date, timedelta

from .models import Deal, RentalContract, SaleContract, MortgageContract
from .serializers import UnifiedDashboardRowSerializer, MobileDealIngestSerializer
from verification.models import Verification

class MobileDealIngestView(generics.CreateAPIView):
    """
    Endpoint for mobile data capture. Inserts base records, 
    maps dual-party configurations, and mounts an open verification check ticket.
    """
    queryset = Deal.objects.all()
    serializer_class = MobileDealIngestSerializer


class AdminDashboardDealListView(generics.ListAPIView):
    """
    Returns single-row consolidated transaction feeds for the React workspace.
    """
    queryset = Deal.objects.all().select_related(
        'property', 'verification', 'rental_contract', 'sale_contract', 'mortgage_contract'
    ).prefetch_related('parties__citizen').order_by('-created_at')
    serializer_class = UnifiedDashboardRowSerializer


class ExecuteVerificationActionView(APIView):
    """
    Handles confirmation updates from admin operations. When all targets 
    pass, it changes general deal statuses and seeds contract models.
    """
    def post(self, request, deal_id, *args, **kwargs):
        try:
            verification = Verification.objects.get(deal_id=deal_id)
        except Verification.DoesNotExist:
            return Response({"error": "Deal target verification row missing"}, status=status.HTTP_404_NOT_FOUND)
            
        action_target = request.data.get("action") # Expected keys: "VERIFY_ID" or "VERIFY_PROPERTY"
        
        if action_target == "VERIFY_ID":
            verification.id_database_match = "PASSED"
        elif action_target == "VERIFY_PROPERTY":
            verification.property_boundary_match = "PASSED"
            
        verification.save()
        
        deal = verification.deal
        if verification.id_database_match == "PASSED" and verification.property_boundary_match == "PASSED":
            deal.status = "APPROVED"
            deal.save()
            
            # Automatically issue specific contracts based on Deal Type
            if deal.deal_type == "RENTAL" and not hasattr(deal, 'rental_contract'):
                RentalContract.objects.create(
                    deal=deal,
                    start_date=date.today(),
                    end_date=date.today() + timedelta(days=365),
                    monthly_rent=deal.transaction_amount / 12,
                    security_deposit=deal.transaction_amount / 6
                )
            elif deal.deal_type == "SALE" and not hasattr(deal, 'sale_contract'):
                SaleContract.objects.create(
                    deal=deal,
                    transfer_date=date.today(),
                    payment_method="BANK_TRANSFER"
                )
            elif deal.deal_type == "MORTGAGE" and not hasattr(deal, 'mortgage_contract'):
                MortgageContract.objects.create(
                    deal=deal,
                    lender_name="National Housing Bank",
                    interest_rate=4.50,
                    duration_months=180
                )
                
        return Response({
            "deal_status": deal.status,
            "id_verified": verification.id_database_match,
            "property_verified": verification.property_boundary_match
        })