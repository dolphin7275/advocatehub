from rest_framework import generics, permissions,status,serializers
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.core.mail import send_mail
from django.conf import settings
from .models import User
from clientapi.models import Client
from lawyerapi.models import Lawyer
from bookingapi.models import Booking
from chat.models import ChatMessage
from videosession.models import VideoSession
from .serializers import RegisterSerializer, LawyerSerializer, BookingSerializer,ChatMessageSerializer
from datetime import datetime
from rest_framework.serializers import ValidationError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.utils.timezone import now
from django.contrib.auth import get_user_model
User = get_user_model()
from .utils import generate_twilio_token  # ✅ import the function

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_auth(request):
    user = request.user
    return Response({
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "is_superuser": user.is_superuser
    })

# ----------------------------
# ✅ Admin Superuser Signup
# ----------------------------

class AdminRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'phone', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        if User.objects.filter(email=attrs['email']).exists():
            raise ValidationError("Email already exists.")
        return attrs

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        name = validated_data['name']
        phone = validated_data['phone']

        user = User.objects.create_superuser(
            username=email,       # Automatically use email as username
            email=email,
            name=name,
            phone=phone,
            password=password,
        )
        user.role = 'admin'
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user


class AdminRegisterView(generics.CreateAPIView):
    serializer_class = AdminRegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data.copy()
        data['role'] = 'admin'
        data['username'] = data.get('email')  # Auto-fill username from email
        data['confirm_password'] = data.get('password')  # Needed for RegisterSerializer

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_superuser = True
            user.is_staff = True
            user.save()
            return Response({"message": "Admin created successfully."}, status=201)

        return Response(serializer.errors, status=400)



# ----------------------------
# ✅ User Registration & Details
# ----------------------------

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]



class UserDetailAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role_data = {}

        if user.role == 'client':
            client = Client.objects.filter(user=user).first()
            if client:
                role_data = {
                    'language': client.language,
                    'dob': client.dob,
                }

        elif user.role == 'lawyer':
            lawyer = Lawyer.objects.filter(user=user).first()
            if lawyer:
                role_data = {
                    'profile_status': lawyer.profile_status,
                    'court_level': lawyer.court_level,
                    'case_types': lawyer.case_types,
                    'price': str(lawyer.price),
                    'available_slots': lawyer.available_slots,
                }

        return Response({
            'id': user.id,
            'username': user.username,
            'name': user.name,
            'email': user.email,
            'phone': user.phone,
            'role': user.role,
            'profile': request.build_absolute_uri(user.profile.url) if user.profile else None,
            'details': role_data
        })

    def patch(self, request):
        user = request.user

        # Handle profile image update
        if 'profile' in request.FILES:
            user.profile = request.FILES['profile']

        phone = request.data.get('phone')
        if phone:
            user.phone = phone

        user.save()

        # Client-specific fields
        if user.role == 'client':
            language = request.data.get('language')
            client = Client.objects.filter(user=user).first()
            if client and language:
                client.language = language
                client.save()

        # Lawyer-specific fields with approval check
        elif user.role == 'lawyer':
            lawyer = Lawyer.objects.filter(user=user).first()
            if not lawyer:
                return Response({'error': 'Lawyer profile not found.'}, status=status.HTTP_404_NOT_FOUND)

            if lawyer.profile_status != 'approved':
                return Response({'error': 'Only approved lawyers can update their profile.'}, status=status.HTTP_403_FORBIDDEN)

            court_level = request.data.get('court_level')
            case_types = request.data.get('case_types')
            price = request.data.get('price')

            if court_level:
                lawyer.court_level = court_level
            if case_types:
                lawyer.case_types = case_types
            if price:
                try:
                    lawyer.price = float(price)
                except ValueError:
                    return Response({'error': 'Price must be a number.'}, status=status.HTTP_400_BAD_REQUEST)

            lawyer.save()

        return Response({'success': True, 'message': 'Profile updated successfully'})


# ----------------------------
# ✅ Lawyer Management (Admin)
# ----------------------------

class PendingLawyersAPI(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        pending = Lawyer.objects.filter(profile_status='pending')
        return Response(LawyerSerializer(pending, many=True).data)


class ApproveLawyerAPI(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, lawyer_id):
        lawyer = Lawyer.objects.filter(id=lawyer_id).first()
        if not lawyer:
            return Response({'error': 'Lawyer not found'}, status=404)

        lawyer.profile_status = 'approved'
        lawyer.save()

        # Optional: Enable to send email on approval
        # send_mail(
        #     subject='Your AdvocateHub profile has been approved!',
        #     message='Congratulations! You can now log in and use the platform.',
        #     from_email='no-reply@advocatehub.in',
        #     recipient_list=[lawyer.user.email],
        # )

        return Response({'message': 'Lawyer approved.'})


class RejectLawyerAPI(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, lawyer_id):
        lawyer = Lawyer.objects.filter(id=lawyer_id).first()
        if not lawyer:
            return Response({'error': 'Lawyer not found'}, status=404)

        lawyer.profile_status = 'rejected'
        lawyer.save()

        # Optional: Enable to send email on rejection
        # send_mail(
        #     subject='Your AdvocateHub profile has been rejected!',
        #     message='Sorry, your registration has been declined.',
        #     from_email='no-reply@advocatehub.in',
        #     recipient_list=[lawyer.user.email],
        # )

        return Response({'message': 'Lawyer rejected.'})


class AllLawyersAPI(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        lawyers = Lawyer.objects.select_related('user').all()
        data = [{
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
            "average_rating": l.average_rating,
            "review_count": l.review_count,
            "signup_date": l.user.date_joined.strftime("%d %B %Y"),
            "phone": l.user.phone,
            "degree": request.build_absolute_uri(l.degree.url) if l.degree else None,
            "aadhar": request.build_absolute_uri(l.aadhar.url) if l.aadhar else None,
            "pan": request.build_absolute_uri(l.pan.url) if l.pan else None,
            "bar": request.build_absolute_uri(l.bar.url) if l.bar else None,
        } for l in lawyers]

        return Response(data)


# ----------------------------
# ✅ Lawyer Access & Slots
# ----------------------------

class ApprovedLawyerListAPI(generics.ListAPIView):
    queryset = Lawyer.objects.filter(profile_status='approved')
    serializer_class = LawyerSerializer
    permission_classes = [AllowAny]


class ApprovedLawyersAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        lawyers = Lawyer.objects.filter(profile_status='approved')
        return Response(LawyerSerializer(lawyers, many=True, context={'request': request}).data)


class LawyerDetailAPI(generics.RetrieveAPIView):
    queryset = Lawyer.objects.filter(profile_status='approved')
    serializer_class = LawyerSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'



class UpdateLawyerSlotsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        incoming_slots = request.data.get('available_slots')
        if not isinstance(incoming_slots, dict):
            return Response({"error": "Invalid slot format"}, status=400)

        lawyer = Lawyer.objects.filter(user=request.user).first()
        if not lawyer:
            return Response({"error": "Lawyer not found"}, status=404)

        lawyer.available_slots = incoming_slots
        lawyer.save()

        return Response({"message": "Slots updated successfully"})


# ----------------------------
# ✅ Booking Management
# ----------------------------

class CreateBookingAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        client = Client.objects.filter(user=request.user).first()
        if not client:
            return Response({"error": "Client not found"}, status=404)

        lawyer_id = request.data.get("lawyer_id")
        slot = request.data.get("scheduled_for")

        lawyer = Lawyer.objects.filter(id=lawyer_id).first()
        if not lawyer:
            return Response({"error": "Lawyer not found"}, status=404)

        date_key = slot.split("T")[0]
        time_val = slot.split("T")[1][:5]
        # slot_dt = datetime.fromisoformat(slot.replace("Z", "+00:00"))  # Handle Zulu time
        # date_key = slot_dt.strftime("%Y-%m-%d")
        # time_val = slot_dt.strftime("%H:%M")

        if time_val not in lawyer.available_slots.get(date_key, []):
            return Response({"error": "Selected slot is not available"}, status=400)

        existing = Booking.objects.filter(
            client=client,
            scheduled_for=slot,
            status__in=['confirmed', 'pending']
        ).exists()
        if existing:
            return Response({"error": "You already have a booking at this time."}, status=400)

        # Remove slot from lawyer's availability
        slot_list = lawyer.available_slots.get(date_key, [])
        if time_val in slot_list:
            slot_list.remove(time_val)
            if slot_list:
                lawyer.available_slots[date_key] = slot_list
            else:
                del lawyer.available_slots[date_key]
            lawyer.save()

        booking = Booking.objects.create(
            client=client,
            lawyer=lawyer,
            scheduled_for=slot,
            status='confirmed',  # ✅ Auto-confirm
            mode=request.data.get("mode"),
            location=request.data.get("location"),
            duration=request.data.get("duration"),
        )

        return Response({
            "message": "Booking created and auto-confirmed.",
            "booking_id": booking.id
        })

class ConfirmBookingAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, booking_id):
        lawyer = Lawyer.objects.filter(user=request.user).first()
        if not lawyer:
            return Response({"error": "Lawyer not found."}, status=404)

        booking = Booking.objects.filter(id=booking_id, lawyer=lawyer).first()
        if not booking:
            return Response({"error": "Booking not found."}, status=404)

        if booking.status != 'pending':
            return Response({"error": "Only pending bookings can be confirmed."}, status=400)

        slot = booking.scheduled_for
        date_key = slot.strftime("%Y-%m-%d")
        time_val = slot.strftime("%H:%M")

        # ✅ Do not check slot availability again. Just clean it from available_slots.
        slot_list = lawyer.available_slots.get(date_key, [])
        if time_val in slot_list:
            slot_list.remove(time_val)
            if slot_list:
                lawyer.available_slots[date_key] = slot_list
            else:
                del lawyer.available_slots[date_key]
            lawyer.save()

        # Confirm the booking
        booking.status = 'confirmed'
        booking.seen_by_client = False
        booking.save()

        return Response({"message": "Booking confirmed successfully."})

class BookingDetailAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, booking_id):
        booking = Booking.objects.filter(id=booking_id).first()
        if not booking:
            return Response({"error": "Booking not found."}, status=404)

        return Response({
            "id": booking.id,
            "scheduled_for": booking.scheduled_for,
            "status": booking.status,
            "lawyer_id": booking.lawyer.id,
            "client_id": booking.client.id,
        })

class MyBookingsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        client = Client.objects.filter(user=request.user).first()
        if not client:
            return Response({"error": "Client not found."}, status=404)

        bookings = Booking.objects.filter(client=client).order_by('-created_at')
        return Response(BookingSerializer(bookings, many=True).data)


class CancelBookingAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, booking_id):
        booking = Booking.objects.filter(id=booking_id, client__user=request.user).first()
        if not booking:
            return Response({"error": "Booking not found."}, status=404)

        if booking.status == 'pending':
            booking.status = 'cancelled'
            booking.save()

            # Restore the slot
            date_key = booking.scheduled_for.strftime("%Y-%m-%d")
            time_val = booking.scheduled_for.strftime("%H:%M")
            lawyer = booking.lawyer
            slots = lawyer.available_slots or {}
            slots.setdefault(date_key, []).append(time_val)
            lawyer.available_slots = slots
            lawyer.save()

            return Response({"message": "Pending booking cancelled and slot restored."})

        elif booking.status == 'confirmed':
            payment_confirmed = request.data.get("payment_confirmed", False)

            if not payment_confirmed:
                return Response({
                    "error": "Half payment required to cancel a confirmed booking.",
                    "require_payment": True,
                    "amount": booking.lawyer.price // 2  # Assuming `price` is per session
                }, status=402)

            # Cancel and restore slot
            booking.status = 'cancelled'
            booking.save()

            date_key = booking.scheduled_for.strftime("%Y-%m-%d")
            time_val = booking.scheduled_for.strftime("%H:%M")
            lawyer = booking.lawyer
            slots = lawyer.available_slots or {}
            slots.setdefault(date_key, []).append(time_val)
            lawyer.available_slots = slots
            lawyer.save()

            return Response({"message": "Confirmed booking cancelled after payment."})

        else:
            return Response({"error": "Booking is already cancelled or rejected."}, status=400)


class RescheduleBookingAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, booking_id):
        new_slot = request.data.get("new_slot")
        reason = request.data.get("reason")

        if not reason:
            return Response({"error": "Reschedule reason is required."}, status=400)

        try:
            new_dt = datetime.fromisoformat(new_slot)
        except ValueError:
            return Response({"error": "Invalid datetime format."}, status=400)

        booking = Booking.objects.filter(id=booking_id, client__user=request.user).first()
        if not booking:
            return Response({"error": "Booking not found."}, status=404)

        if booking.status != 'confirmed':
            return Response({"error": "Only confirmed bookings can be rescheduled."}, status=400)

        lawyer = booking.lawyer
        date_key = new_dt.strftime("%Y-%m-%d")
        time_val = new_dt.strftime("%H:%M")

        # ✅ Check if new slot exists in lawyer's availability
        if time_val not in lawyer.available_slots.get(date_key, []):
            return Response({"error": "New slot is not available."}, status=400)

        # ✅ Re-add the old slot back
        old_date = booking.scheduled_for.strftime("%Y-%m-%d")
        old_time = booking.scheduled_for.strftime("%H:%M")
        lawyer.available_slots.setdefault(old_date, []).append(old_time)

        # ✅ Remove new slot from availability
        lawyer.available_slots[date_key].remove(time_val)
        if not lawyer.available_slots[date_key]:
            del lawyer.available_slots[date_key]

        lawyer.save()

        # ✅ Update booking with new time, status, and reset seen flags
        booking.scheduled_for = new_dt
        booking.status = 'pending'  # 🔁 Back to pending until confirmed again
        booking.seen_by_client = False
        booking.seen_by_lawyer = False
        booking.reschedule_reason = reason  # 🔹 Save the reschedule reason
        booking.save()

        return Response({"message": "Booking rescheduled successfully."})


class LawyerBookingsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        lawyer = Lawyer.objects.filter(user=request.user).first()
        if not lawyer:
            return Response({"error": "Lawyer not found."}, status=404)

        bookings = Booking.objects.filter(lawyer=lawyer).order_by('-created_at')
        serialized = []
        for booking in bookings:
            serialized.append({
                'id': booking.id,
                'scheduled_for': booking.scheduled_for,
                'status': booking.status,
                'mode': booking.mode,
                'location': booking.location,
                'duration': booking.duration,
                'client_name': booking.client.user.name if booking.client and booking.client.user else '',
                'client_id': booking.client.id if booking.client else '',
            })
        return Response(BookingSerializer(bookings, many=True).data)


class RejectBookingAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, booking_id):
        lawyer = Lawyer.objects.filter(user=request.user).first()
        if not lawyer:
            return Response({"error": "Lawyer not found."}, status=404)

        booking = Booking.objects.filter(id=booking_id, lawyer=lawyer).first()
        if not booking:
            return Response({"error": "Booking not found."}, status=404)

        if booking.status != 'pending':
            return Response({"error": "Only pending bookings can be rejected."}, status=400)

        booking.status = 'rejected'
        booking.save()

        return Response({"message": "Booking rejected successfully."})

# _______________________________________________
# NotificationView


# ________________________________________________________
class NotificationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == 'client':
            bookings = Booking.objects.filter(client=user.client, seen_by_client=False).exclude(status='pending')
        elif user.role == 'lawyer':
            bookings = Booking.objects.filter(lawyer=user.lawyer, seen_by_lawyer=False).exclude(status='pending')
        else:
            return Response({"notifications": []})

        # Serialize response
        notifications = [{
            "id": b.id,
            "status": b.status,
            "scheduled_for": b.scheduled_for,
            "client": b.client.user.name,
            "lawyer": b.lawyer.user.name
        } for b in bookings]

        return Response({"notifications": notifications})
    
class MarkNotificationsSeenAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.role == 'client':
            Booking.objects.filter(client=user.client, seen_by_client=False).update(seen_by_client=True)
        elif user.role == 'lawyer':
            Booking.objects.filter(lawyer=user.lawyer, seen_by_lawyer=False).update(seen_by_lawyer=True)
        return Response({"success": True})



# ____________________________________________________________________

class ChatHistoryAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, booking_id):
        messages = ChatMessage.objects.filter(booking__id=booking_id).order_by("timestamp")
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data)
# ________________________________________________________________________________________________________

# views :

class VideoTokenRetrieveAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, booking_id):
        try:
            booking = Booking.objects.select_related('client', 'lawyer').get(id=booking_id)
            allowed_users = [booking.client.user, booking.lawyer.user]
            # Some Error in Auths
            # if request.user not in allowed_users:
            #     return Response({"detail": "Access denied"}, status=status.HTTP_403_FORBIDDEN)

            session, _ = VideoSession.objects.get_or_create(booking=booking)
            session.participants.add(request.user)
            session.save()

            token = generate_twilio_token(str(request.user.id), room_name=str(booking.id))

            return Response({
                "token": token,
                "room": str(booking.id),
                "booking_id": booking.id
            })

        except Booking.DoesNotExist:
            return Response({"detail": "Booking not found."}, status=status.HTTP_404_NOT_FOUND)


class VideoTokenCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        booking_id = request.data.get("booking")
        participant_ids = request.data.get("participants", [])

        try:
            booking = Booking.objects.get(id=booking_id)
            session, _ = VideoSession.objects.get_or_create(booking=booking)

            for user_id in participant_ids:
                try:
                    user = User.objects.get(id=user_id)
                    session.participants.add(user)
                except User.DoesNotExist:
                    continue

            session.save()

            return Response({
                "message": "Participants added",
                "booking_id": booking.id,
                "participants": list(session.participants.values("id", "username"))
            })

        except Booking.DoesNotExist:
            return Response({"detail": "Booking not found."}, status=status.HTTP_404_NOT_FOUND)