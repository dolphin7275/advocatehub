from django.db import models
from django.utils import timezone
from bookingapi.models import Booking
from advocateshub.models import User

class VideoSession(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='video_session')
    participants = models.ManyToManyField(User)
    started_at = models.DateTimeField(default=timezone.now)
    ended_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"VideoSession for Booking #{self.booking.id}"
