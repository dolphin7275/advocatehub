
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import WebsiteFeedback
from .serializers import WebsiteFeedbackSerializer

class WebsiteFeedbackViewSet(viewsets.ModelViewSet):
    queryset = WebsiteFeedback.objects.all()
    serializer_class = WebsiteFeedbackSerializer

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [IsAuthenticated]
        elif self.action == 'list':
            # Decide if website feedback is public or admin-only
            self.permission_classes = [AllowAny]
        elif self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [IsAuthenticated]
        return [permission() for permission in self.permission_classes]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = WebsiteFeedback.objects.all()
        return queryset
