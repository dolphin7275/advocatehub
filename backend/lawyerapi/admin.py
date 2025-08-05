
# from django.contrib import admin
# from .models import Lawyer

# @admin.register(Lawyer)
# class LawyerAdmin(admin.ModelAdmin):
#     list_display = (    
#         'user', 'cnic', 'location', 'court_level', 'profile_status', 
#         'price', 'average_rating', 'review_count'
#     )
#     list_filter = ('profile_status', 'court_level', 'location')
#     search_fields = ('user__username', 'cnic', 'location', 'case_types')
#     readonly_fields = ('average_rating', 'review_count') 
