# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import status

# from .models import Booking, VideoSession
# from django.contrib.auth.models import User
# from .utils import generate_twilio_token  # ✅ import the function

# class VideoChatAPIView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, booking_id):
#         try:
#             booking = Booking.objects.select_related('client_user', 'lawyer_user').get(id=booking_id)

#             # Adjust based on actual field names in Booking
#             allowed_users = [booking.client_user, booking.lawyer_user]
#             if request.user not in allowed_users:
#                 return Response({"detail": "Access denied"}, status=status.HTTP_403_FORBIDDEN)

#             session, _ = VideoSession.objects.get_or_create(booking=booking)
#             session.participants.add(request.user)
#             session.save()

#             token = generate_twilio_token(str(request.user.id), room_name=str(booking.id))

#             return Response({
#                 "token": token,
#                 "room": str(booking.id),
#                 "booking_id": booking.id
#             })

#         except Booking.DoesNotExist:
#             return Response({"detail": "Booking not found."}, status=status.HTTP_404_NOT_FOUND)
