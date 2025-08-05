
from django.db import models
from django.conf import settings 
from django.db.models.signals import post_save, post_delete #
from django.dispatch import receiver


from lawyerapi.models import Lawyer 

class Review(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='given_reviews',
        help_text="The user who gave the review."
    )
    lawyer = models.ForeignKey(
        Lawyer, 
        on_delete=models.CASCADE,
        related_name='reviews',
        help_text="The lawyer being reviewed."
    )
    rating = models.IntegerField(
        choices=[(i, str(i)) for i in range(1, 6)], # Rating from 1 to 5
        help_text="Rating given to the lawyer (1-5 stars)."
    )
    feedback = models.TextField(
        blank=True, 
        null=True,
        help_text="Optional text feedback for the lawyer."
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Lawyer Review"
        verbose_name_plural = "Lawyer Reviews"
        unique_together = ('user', 'lawyer') 
        ordering = ['-created_at'] # Order by most recent first

    def __str__(self):
        return f"Review by {self.user.username} for {self.lawyer.user.username}: {self.rating} stars"


class ReviewReply(models.Model):
    review = models.OneToOneField(
        Review,
        on_delete=models.CASCADE,
        related_name='reply',
        help_text="The review being replied to."
    )
    lawyer = models.ForeignKey(
        Lawyer,
        on_delete=models.CASCADE,
        help_text="The lawyer replying to the review."
    )
    reply_text = models.TextField(
        help_text="Reply from the lawyer to the user review."
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Review Reply"
        verbose_name_plural = "Review Replies"

    def __str__(self):
        return f"Reply by {self.lawyer.user.username} to review {self.review.id}"

# --- Signals to update Lawyer's average_rating and review_count ---
@receiver(post_save, sender=Review)
def update_lawyer_rating_on_save(sender, instance, **kwargs):
    instance.lawyer.update_average_rating()

@receiver(post_delete, sender=Review)
def update_lawyer_rating_on_delete(sender, instance, **kwargs):
    instance.lawyer.update_average_rating()
