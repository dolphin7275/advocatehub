
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from django.core.exceptions import PermissionDenied
from rest_framework.decorators import api_view, permission_classes
from rest_framework.serializers import ValidationError

from .models import Review, ReviewReply
from lawyerapi.models import Lawyer 
from .serializers import ReviewSerializer, ReviewReplySerializer
from advocateshub.serializers import LawyerSerializer

User = get_user_model()

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated] 

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) # Pass the current user to the serializer's create method

    def get_queryset(self):
        queryset = Review.objects.all()
        user_id = self.request.query_params.get('user_id', None)
        if user_id is not None:
            queryset = queryset.filter(user__id=user_id)
        return queryset


# ✅ NEW: REPLY VIEWSET (for Lawyers only)
class ReviewReplyViewSet(viewsets.ModelViewSet):
    queryset = ReviewReply.objects.all()
    serializer_class = ReviewReplySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        try:
            lawyer = Lawyer.objects.get(user=user)
        except Lawyer.DoesNotExist:
            raise PermissionDenied("Only lawyers can reply to reviews.")

        review_id = self.request.data.get('review')
        if not review_id:
            raise ValidationError({"review": "Review ID is required."})
        
        review = get_object_or_404(Review, id=review_id)

        # Prevent duplicate replies
        if ReviewReply.objects.filter(review=review).exists():
            raise ValidationError("This review already has a reply.")

        serializer.save(lawyer=lawyer, review=review)

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return ReviewReply.objects.all()
        return ReviewReply.objects.filter(lawyer__user=user)

class LawyerReviewsAPIView(APIView):
    permission_classes = [AllowAny] # Reviews can be publicly viewed

    def get(self, request, lawyer_id, format=None):
        try:
            lawyer_instance = get_object_or_404(Lawyer, user__id=lawyer_id)
        except Lawyer.DoesNotExist:
            return Response({"detail": "Lawyer profile not found."}, status=status.HTTP_404_NOT_FOUND)
        
        reviews = Review.objects.filter(lawyer=lawyer_instance).order_by('-created_at')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, lawyer_id, format=None):
    # 👨‍⚖️ Ensure lawyer exists
        lawyer_instance = get_object_or_404(Lawyer, user__id=lawyer_id)

    # 🧠 Add the lawyer_id into the request data so serializer can use it
        data = request.data.copy()
        data['lawyer_id'] = lawyer_id

    # 💡 Pass request in context for create()
        serializer = ReviewSerializer(data=data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LawyerDetailWithReviewsAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, lawyer_id, format=None):
        try:
            lawyer_instance = get_object_or_404(Lawyer, user__id=lawyer_id)
        except Lawyer.DoesNotExist:
            return Response({"detail": "Lawyer profile not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = LawyerSerializer(lawyer_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
