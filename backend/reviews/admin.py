
from django.contrib import admin
from .models import Review, ReviewReply

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'lawyer', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('user__username', 'lawyer__user__username', 'feedback')
    readonly_fields = ('created_at',) # These fields are set automatically or by system
    raw_id_fields = ('user', 'lawyer') 

admin.site.register(ReviewReply)