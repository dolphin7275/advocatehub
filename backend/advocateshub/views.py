# ✅ advocateshub/views.py
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser,AllowAny
from django.core.mail import send_mail
from django.conf import settings
from .models import User
from clientapi.models import Client
from lawyerapi.models import Lawyer
from bookingapi.models import Booking
from .serializers import RegisterSerializer, LawyerSerializer,BookingSerializer
from datetime import datetime


# Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser]

# Current user info
class UserDetailAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role_data = {}

        if user.role == 'client':
            try:
                client = Client.objects.get(user=user)
                role_data = {
                    'language': client.language,
                    'dob': client.dob,
                }
            except Client.DoesNotExist:
                pass

        elif user.role == 'lawyer':
            try:
                lawyer = Lawyer.objects.get(user=user)
                role_data = {
                    'profile_status': lawyer.profile_status,
                    'court_level': lawyer.court_level,
                    'case_types': lawyer.case_types,
                    'price': str(lawyer.price),
                }
            except Lawyer.DoesNotExist:
                pass

        return Response({
            'id': user.id,
            'username': user.username,
            'name': user.name,
            'email': user.email,
            'phone': user.phone,
            'role': user.role,
            'profile': user.profile.url if user.profile else None,
            'details': role_data
        })

# Admin: List pending lawyers
class PendingLawyersAPI(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        lawyers = Lawyer.objects.filter(profile_status='pending')
        return Response(LawyerSerializer(lawyers, many=True).data)

# Admin: Approve
class ApproveLawyerAPI(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, lawyer_id):
        try:
            lawyer = Lawyer.objects.get(id=lawyer_id)
            lawyer.profile_status = 'approved'
            lawyer.save()
          
            # Email (disabled by default)
            # send_mail(
            #     subject='Your AdvocateHub profile has been approved!',
            #     message='Congratulations! You can now log in and start using the platform.',
            #     from_email='no-reply@advocatehub.in',
            #     recipient_list=[lawyer.user.email],
            # )
            return Response({'message': 'Lawyer approved.'})
        except Lawyer.DoesNotExist:
            return Response({'error': 'Lawyer not found'}, status=404)
        

class ApprovedLawyerListAPI(generics.ListAPIView):
    queryset = Lawyer.objects.filter(profile_status='approved')
    serializer_class = LawyerSerializer
    permission_classes = [AllowAny]

# Admin: Reject
class RejectLawyerAPI(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, lawyer_id):
        try:
            lawyer = Lawyer.objects.get(id=lawyer_id)
            lawyer.profile_status = 'rejected'
            lawyer.save()
          
            # Email (disabled by default)
            # send_mail(
            #     subject='Your AdvocateHub profile has been rejected!',
            #     message='Sorry! You are not eligiable to log in and start using the platform.',
            #     from_email='no-reply@advocatehub.in',
            #     recipient_list=[lawyer.user.email],
            # )
            return Response({'message': 'Lawyer rejected.'})
        except Lawyer.DoesNotExist:
            return Response({'error': 'Lawyer not found'}, status=404)

# Client: list all approved
class ApprovedLawyerListAPI(generics.ListAPIView):
    queryset = Lawyer.objects.filter(profile_status='approved')
    serializer_class = LawyerSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        return {'request': self.request}

# Client: retrieve single lawyer
class LawyerDetailAPI(generics.RetrieveAPIView):
    queryset = Lawyer.objects.filter(profile_status='approved')
    serializer_class = LawyerSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

# Admin: get all lawyers
class AllLawyersAPI(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        lawyers = Lawyer.objects.select_related('user').all()
        data = []
        for l in lawyers:
            data.append({
                "id": l.id,
                "user_name": l.user.name,
                "user_email": l.user.email,
                "user_profile": request.build_absolute_uri(l.user.profile.url) if l.user.profile else None,
                "cnic": l.cnic,
                "education": l.education,
                "location": l.location,
                "experience": l.experience,
                "languages": getattr(l.user, 'language', "English, Hindi"),
                "price": str(l.price) if l.price else "500",
                "case_types": l.case_types,
                "court_level": l.court_level,
                "profile_status": l.profile_status,
                "signup_date": l.user.date_joined.strftime("%d %B %Y"),
                "phone": l.user.phone,
                "degree": request.build_absolute_uri(l.degree.url) if l.degree else None,
                "aadhar": request.build_absolute_uri(l.aadhar.url) if l.aadhar else None,
                "pan": request.build_absolute_uri(l.pan.url) if l.pan else None,
                "bar": request.build_absolute_uri(l.bar.url) if l.bar else None,
            })
        return Response(data)

# Lawyer: update slots
class UpdateLawyerSlotsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            lawyer = Lawyer.objects.get(user=request.user)
            slots = request.data.get('available_slots')
            if not isinstance(slots, dict):
                return Response({"error": "Invalid slot format"}, status=400)
            lawyer.available_slots = slots
            lawyer.save()
            return Response({"message": "Slots updated successfully"})
        except Lawyer.DoesNotExist:
            return Response({"error": "Lawyer not found"}, status=404)


# booking api 
class CreateBookingAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        client = Client.objects.get(user=request.user)
        lawyer_id = request.data.get("lawyer_id")
        slot = request.data.get("scheduled_for")

        try:
            lawyer = Lawyer.objects.get(id=lawyer_id)

            # Check slot availability
            date_key = slot.split("T")[0]
            time_val = slot.split("T")[1][:5]
            if time_val not in lawyer.available_slots.get(date_key, []):
                return Response({"error": "Selected slot is not available"}, status=400)

            # Create Booking
            booking = Booking.objects.create(
                client=client,
                lawyer=lawyer,
                scheduled_for=slot,
                status='confirmed'
            )

            # Remove slot
            lawyer.available_slots[date_key].remove(time_val)
            if not lawyer.available_slots[date_key]:
                del lawyer.available_slots[date_key]
            lawyer.save()

            return Response({"message": "Booking confirmed", "booking_id": booking.id})
        except Lawyer.DoesNotExist:
            return Response({"error": "Lawyer not found"}, status=404)

# ✅ List client bookings
class MyBookingsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            client = Client.objects.get(user=request.user)
        except Client.DoesNotExist:
            return Response({"error": "Client not found."}, status=404)

        bookings = Booking.objects.filter(client=client).order_by('-created_at')
        return Response(BookingSerializer(bookings, many=True).data)


# ✅ Cancel booking
class CancelBookingAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, booking_id):
        try:
            booking = Booking.objects.get(id=booking_id, client__user=request.user)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found."}, status=404)

        if booking.status != 'confirmed':
            return Response({"error": "Only confirmed bookings can be canceled."}, status=400)

        booking.status = 'cancelled'
        booking.save()

        # Optional: Re-add slot to lawyer's available_slots
        date_key = booking.scheduled_for.strftime("%Y-%m-%d")
        time_val = booking.scheduled_for.strftime("%H:%M")
        lawyer = booking.lawyer
        slots = lawyer.available_slots or {}
        if date_key not in slots:
            slots[date_key] = []
        if time_val not in slots[date_key]:
            slots[date_key].append(time_val)
        lawyer.available_slots = slots
        lawyer.save()

        return Response({"message": "Booking cancelled and slot restored."})


# ✅ Reschedule booking
class RescheduleBookingAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, booking_id):
        new_slot = request.data.get("new_slot")

        try:
            new_dt = datetime.fromisoformat(new_slot)
        except Exception:
            return Response({"error": "Invalid datetime format."}, status=400)

        try:
            booking = Booking.objects.get(id=booking_id, client__user=request.user)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found."}, status=404)

        if booking.status != 'confirmed':
            return Response({"error": "Only confirmed bookings can be rescheduled."}, status=400)

        lawyer = booking.lawyer
        date_key = new_dt.strftime("%Y-%m-%d")
        time_val = new_dt.strftime("%H:%M")

        if date_key not in lawyer.available_slots or time_val not in lawyer.available_slots[date_key]:
            return Response({"error": "New slot not available."}, status=400)

        # Remove old slot from booking
        old_date = booking.scheduled_for.strftime("%Y-%m-%d")
        old_time = booking.scheduled_for.strftime("%H:%M")

        old_slots = lawyer.available_slots
        if old_date not in old_slots:
            old_slots[old_date] = []
        if old_time not in old_slots[old_date]:
            old_slots[old_date].append(old_time)

        # Remove new slot from available
        lawyer.available_slots[date_key].remove(time_val)
        if not lawyer.available_slots[date_key]:
            del lawyer.available_slots[date_key]

        lawyer.available_slots = old_slots
        lawyer.save()

        booking.scheduled_for = new_dt
        booking.save()

        return Response({"message": "Booking rescheduled successfully."})


# Booking: Lawyer view own bookings
class LawyerBookingsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            lawyer = Lawyer.objects.get(user=request.user)
        except Lawyer.DoesNotExist:
            return Response({"error": "Lawyer not found."}, status=404)

        bookings = Booking.objects.filter(lawyer=lawyer).order_by('-created_at')
        return Response(BookingSerializer(bookings, many=True).data)