
# ✅ lawyerapi/models.py
from django.db import models
from advocateshub.models import User
from django.db.models import Avg, Count 

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
    
    #added code
    
    average_rating = models.DecimalField(
        max_digits=3, 
        decimal_places=2, 
        default=0.00, 
        help_text="Average rating based on client reviews."
    )
    review_count = models.IntegerField(
        default=0, 
        help_text="Total number of reviews received."
    )

    
    def __str__(self):
        return f"Lawyer: {self.user.username}"
    
    
    def update_average_rating(self):
        from reviews.models import Review 
        # Aggregate reviews for this lawyer
        stats = Review.objects.filter(lawyer=self).aggregate(
            avg_rating=Avg('rating'),
            count_reviews=Count('id')
        )
        
        self.average_rating = stats['avg_rating'] if stats['avg_rating'] is not None else 0.00
        self.review_count = stats['count_reviews'] if stats['count_reviews'] is not None else 0
        self.save(update_fields=['average_rating', 'review_count']) # Save only these fields
