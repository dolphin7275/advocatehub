from django.db import models
from clientapi.models import Client
from lawyerapi.models import Lawyer

class Booking(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    lawyer = models.ForeignKey(Lawyer, on_delete=models.CASCADE)
    scheduled_for = models.DateTimeField()
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('confirmed', 'Confirmed'),
            ('rejected', 'Rejected')
        ]
    )
    seen_by_client = models.BooleanField(default=False)
    seen_by_lawyer = models.BooleanField(default=False)
    mode = models.CharField(max_length=20, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    duration = models.IntegerField(null=True, blank=True)
    reschedule_reason = models.TextField(null=True, blank=True)  # ✅ New field
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking by {self.client.user.username} with {self.lawyer.user.username} on {self.scheduled_for}"
