from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, LoginSerializer
from .models import LawyerProfile
from .serializers import LawyerProfileSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = ['AllowAny']

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _, token = AuthToken.objects.create(user)
        return Response({
            'user': UserSerializer(user).data,
            'token': token
        })

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
            'user': UserSerializer(user).data,
            'token': token
        })
    


class LawyerProfileView(generics.CreateAPIView):
    queryset = LawyerProfile.objects.all()
    serializer_class = LawyerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class LawyerListView(generics.ListAPIView):
    queryset = LawyerProfile.objects.filter(profile_status='approved')
    serializer_class = LawyerProfileSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = self.queryset
        court_level = self.request.query_params.get('court_level')
        location = self.request.query_params.get('location')
        case_type = self.request.query_params.get('case_type')
        if court_level:
            queryset = queryset.filter(court_level=court_level)
        if location:
            queryset = queryset.filter(practice_district__icontains=location)
        if case_type:
            queryset = queryset.filter(case_types__contains=[case_type])
        return queryset