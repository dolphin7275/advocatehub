
from django.contrib import admin
from .models import WebsiteFeedback

@admin.register(WebsiteFeedback)
class WebsiteFeedbackAdmin(admin.ModelAdmin):
    list_display = ('user', 'rating', 'feedback_text', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('user__username', 'feedback_text')
    readonly_fields = ('user', 'created_at') 
