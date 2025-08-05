
from django.db import models
from django.conf import settings 

class WebsiteFeedback(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='website_feedback',
        help_text="The user who provided the feedback."
    )
    rating = models.IntegerField(
        choices=[(i, str(i)) for i in range(1, 6)],
        null=True, blank=True, # Make rating optional if feedback text is primary
        help_text="Optional rating given to the website (1-5 stars)."
    )
    feedback_text = models.TextField(
        help_text="The detailed feedback provided by the user."
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Website Feedback"
        verbose_name_plural = "Website Feedback"
        ordering = ['-created_at'] 

    def __str__(self):
        return f"Feedback by {self.user.username} on {self.created_at.strftime('%Y-%m-%d')}: {self.feedback_text[:50]}..."

class WebsiteFeedbackReply(models.Model):
    feedback = models.OneToOneField(
        WebsiteFeedback,
        on_delete=models.CASCADE,
        related_name='reply',
        help_text="The feedback being replied to."
    )
    responder = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        help_text="The admin or support person replying to the feedback."
    )
    reply_text = models.TextField(help_text="Reply from admin/support.")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Website Feedback Reply"
        verbose_name_plural = "Website Feedback Replies"

    def __str__(self):
        return f"Reply by {self.responder.username} to feedback #{self.feedback.id}"
