# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from .models import ChatMessage
# from advocatehub.serializers import ChatMessageSerializer

# class ChatHistoryAPI(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, booking_id):
#         messages = ChatMessage.objects.filter(booking__id=booking_id)
#         serializer = ChatMessageSerializer(messages, many=True)
#         return Response(serializer.data)
