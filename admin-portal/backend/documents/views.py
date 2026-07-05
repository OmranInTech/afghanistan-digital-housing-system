from rest_framework import viewsets
from .models import Document
from .serializers import DocumentSerializer

class DocumentViewSet(viewsets.ModelViewSet):
    """
    Handles physical file attachments linked directly to specific deals:
    GET /api/documents/ - List uploaded attachments
    POST /api/documents/ - Upload verification proofs
    """
    queryset = Document.objects.all().order_by('-uploaded_at')
    serializer_class = DocumentSerializer