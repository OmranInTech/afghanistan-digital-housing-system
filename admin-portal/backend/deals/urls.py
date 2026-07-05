from django.urls import path
from .views import MobileDealIngestView, AdminDashboardDealListView, ExecuteVerificationActionView

urlpatterns = [
    path('deals/submit/', MobileDealIngestView.as_view(), name='mobile-deal-submit'),
    path('deals/dashboard/', AdminDashboardDealListView.as_view(), name='admin-dashboard'),
    path('deals/<uuid:deal_id>/verify/', ExecuteVerificationActionView.as_view(), name='execute-verification'),
]