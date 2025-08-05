import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.booking_id = self.scope['url_route']['kwargs']['booking_id']
        self.room_group_name = f"chat_{self.booking_id}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        print(f"✅ WebSocket connected to {self.room_group_name}")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        print(f"❌ WebSocket disconnected from {self.room_group_name}")

    async def receive(self, text_data):
        try:
            from chat.models import ChatMessage       # moved here
            from bookingapi.models import Booking     # moved here
            from django.contrib.auth import get_user_model  # moved here
            User = get_user_model()

            data = json.loads(text_data)
            message = data.get("message")
            sender_name = data.get("sender")

            if not message or not sender_name:
                print("⚠️ Missing message or sender")
                return

            booking = await self.get_booking(self.booking_id)
            sender = await self.get_user_by_name(sender_name, User)

            if booking and sender:
                saved_msg = await self.save_message(booking, sender, message)

                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "chat_message",
                        "message": saved_msg.message,
                        "sender": sender.name,
                        "timestamp": saved_msg.timestamp.isoformat(),
                    }
                )
            else:
                print("❌ Booking or sender not found")

        except Exception as e:
            print("🔥 Error in receive:", e)

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "sender": event["sender"],
            "timestamp": event["timestamp"]
        }))

    @database_sync_to_async
    def get_booking(self, booking_id):
        from bookingapi.models import Booking  # moved here too
        try:
            return Booking.objects.filter(id=booking_id).first()
        except Booking.DoesNotExist:
            return None

    @database_sync_to_async
    def get_user_by_name(self, name, User):
        try:
            return User.objects.filter(name=name).first()
        except User.DoesNotExist:
            return None

    @database_sync_to_async
    def save_message(self, booking, sender, message):
        from chat.models import ChatMessage  # moved here too
        return ChatMessage.objects.create(
            booking=booking,
            sender=sender,
            message=message
        )
