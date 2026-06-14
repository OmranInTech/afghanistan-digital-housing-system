from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token # Required for token generation
from .serializers import AgentRegistrationSerializer, LoginSerializer # Ensure LoginSerializer is imported

class AgentRegistrationView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = AgentRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            agent = serializer.save()
            return Response({"status": "success", "data": {"auth_code": agent.auth_code}}, status=status.HTTP_201_CREATED)
        return Response({"status": "error", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        
        if serializer.is_valid():
            # In your LoginSerializer, .validated_data should return the user object
            user = serializer.validated_data
            
            # Create or get the token for the user
            token, created = Token.objects.get_or_create(user=user)
            
            return Response({
                "status": "success",
                "message": "Login successful",
                "token": token.key,
                "data": {
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role": user.role,
                }
            }, status=status.HTTP_200_OK)
            
        return Response({
            "status": "error",
            "message": "Invalid credentials",
            "errors": serializer.errors
        }, status=status.HTTP_401_UNAUTHORIZED)