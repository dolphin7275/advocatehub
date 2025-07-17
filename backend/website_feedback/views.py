
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import WebsiteFeedback, WebsiteFeedbackReply
from .serializers import WebsiteFeedbackSerializer, WebsiteFeedbackReplySerializer
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404


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

class WebsiteFeedbackReplyViewSet(viewsets.ModelViewSet):
    queryset = WebsiteFeedbackReply.objects.all()
    serializer_class = WebsiteFeedbackReplySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        feedback_id = self.request.data.get('feedback')
        if not feedback_id:
            raise ValidationError({"feedback": "Feedback ID is required."})
        
        feedback = get_object_or_404(WebsiteFeedback, id=feedback_id)

        if WebsiteFeedbackReply.objects.filter(feedback=feedback).exists():
            raise ValidationError("This feedback already has a reply.")

        serializer.save(responder=user, feedback=feedback)

    def get_queryset(self):
        return WebsiteFeedbackReply.objects.all()