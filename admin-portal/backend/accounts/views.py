# accounts/views.py
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SalesAgentRegistrationSerializer

class RegisterSalesAgentView(APIView):
    # Set to AllowAny so your local React app can save agents directly without headers
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = SalesAgentRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "Security Field Agent record provisioned successfully."
                }, 
                status=status.HTTP_201_CREATED
            )
        
        return Response(
            {
                "success": False,
                "errors": serializer.errors
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )