
# ✅ lawyerapi/models.py
from django.db import models
from advocateshub.models import User

class Lawyer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cnic = models.CharField(max_length=20)
    education = models.CharField(max_length=100)
    degree = models.FileField(upload_to='kyc/degree/', null=True, blank=True)
    aadhar = models.FileField(upload_to='kyc/aadhar/', null=True, blank=True)
    pan = models.FileField(upload_to='kyc/pan/', null=True, blank=True)
    bar = models.FileField(upload_to='kyc/bar/', null=True, blank=True)
    location = models.CharField(max_length=100)
    court_level = models.CharField(max_length=50)
    case_types = models.CharField(max_length=200)
    experience = models.CharField(max_length=50)
    availability = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    profile_status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending')
    available_slots = models.JSONField(default=dict, blank=True)
    languages = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Lawyer: {self.user.username}"