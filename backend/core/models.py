from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('client', 'Client'),
        ('lawyer', 'Lawyer'),
    )
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    district = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    username = None  # Disable username field
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone', 'user_type']

    def __str__(self):
        return self.email

class LawyerProfile(models.Model):
    COURT_LEVEL_CHOICES = (
        ('district', 'District'),
        ('state', 'State'),
        ('supreme', 'Supreme'),
    )
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    CASE_TYPE_CHOICES = (
        ('Family', 'Family'),
        ('Property', 'Property'),
        ('Civil', 'Civil'),
        ('Employment', 'Employment'),
        ('Criminal', 'Criminal'),
        ('Corporate/IP', 'Corporate/IP'),
        ('Other', 'Other'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='lawyer_profile')
    bar_council_id = models.CharField(max_length=50)
    aadhar_number = models.CharField(max_length=12)
    pan_number = models.CharField(max_length=10)
    court_level = models.CharField(max_length=10, choices=COURT_LEVEL_CHOICES)
    practice_district = models.CharField(max_length=100)
    practice_state = models.CharField(max_length=100)
    experience_years = models.PositiveIntegerField()
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2)
    case_types = models.CharField(max_length=100, choices=CASE_TYPE_CHOICES) # ArrayField for PostgreSQL
    profile_status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.profile_status}"

class AvailabilitySlot(models.Model):
    lawyer_profile = models.ForeignKey(LawyerProfile, on_delete=models.CASCADE, related_name='slots')
    date = models.DateField()
    time = models.TimeField()
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.lawyer_profile.user.email} - {self.date} {self.time}"

class Booking(models.Model):
    STATUS_CHOICES = (
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    MODE_CHOICES = (
        ('chat', 'Chat'),
        ('video', 'Video'),
    )
    PAYMENT_STATUS = (
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    lawyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lawyer_bookings')
    date = models.DateField()
    time = models.TimeField()
    mode = models.CharField(max_length=10, choices=MODE_CHOICES)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='scheduled')
    payment_status = models.CharField(max_length=10, choices=PAYMENT_STATUS, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.id} - {self.user.email} with {self.lawyer.email}"

class ChatMessage(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    message_text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message {self.id} - {self.sender.email}"

class VideoSession(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='video_session')
    video_url = models.URLField()
    started_at = models.DateTimeField(null=True)
    ended_at = models.DateTimeField(null=True)

    def __str__(self):
        return f"Video Session for Booking {self.booking.id}"

class Payment(models.Model):
    PAYOUT_STATUS = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    lawyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lawyer_payments')
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    platform_commission = models.DecimalField(max_digits=5, decimal_places=2)
    payout_status = models.CharField(max_length=10, choices=PAYOUT_STATUS, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.id} for Booking {self.booking.id}"

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    lawyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lawyer_reviews')
    rating = models.PositiveSmallIntegerField()
    feedback = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review {self.rating} by {self.user.email} for {self.lawyer.email}"