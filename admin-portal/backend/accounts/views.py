from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import AgentRegistrationSerializer

class AgentRegistrationView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = AgentRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            agent = serializer.save()
            return Response({"status": "success", "data": {"auth_code": agent.auth_code}}, status=status.HTTP_201_CREATED)
        return Response({"status": "error", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)