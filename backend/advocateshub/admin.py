from django.contrib import admin
from django.utils.html import format_html
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from advocateshub.models import User
from clientapi.models import Client
from lawyerapi.models import Lawyer
from bookingapi.models import Booking


# 🧑‍⚖️ Custom User Admin
class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ('username', 'email', 'name', 'phone', 'role', 'is_active', 'is_staff')
    list_filter = ('role', 'is_active', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email', 'name', 'phone')
    ordering = ('username',)

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('name', 'email', 'phone', 'profile')}),
        (_('Permissions'), {'fields': ('role', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'name', 'email', 'phone', 'role', 'password1', 'password2'),
        }),
    )

admin.site.register(User, UserAdmin)


# 👤 Client Admin
@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('user', 'language', 'dob')
    search_fields = ('user__username', 'language')
    ordering = ('user__username',)


# 👨‍⚖️ Lawyer Admin with file previews + readable slots
@admin.register(Lawyer)
class LawyerAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'cnic', 'location', 'court_level', 'experience', 'price',
        'profile_status', 'preview_degree', 'preview_aadhar', 'preview_pan',
        'preview_bar', 'slot_summary'
    )
    list_filter = ('profile_status', 'court_level', 'location')
    search_fields = ('user__username', 'location', 'case_types')
    ordering = ('user__username',)

    def preview_degree(self, obj):
        if obj.degree:
            return format_html("<a href='{}' target='_blank'>Degree</a>", obj.degree.url)
        return "-"
    preview_degree.short_description = "Degree"

    def preview_aadhar(self, obj):
        if obj.aadhar:
            return format_html("<a href='{}' target='_blank'>Aadhar</a>", obj.aadhar.url)
        return "-"
    preview_aadhar.short_description = "Aadhar"

    def preview_pan(self, obj):
        if obj.pan:
            return format_html("<a href='{}' target='_blank'>PAN</a>", obj.pan.url)
        return "-"
    preview_pan.short_description = "PAN"

    def preview_bar(self, obj):
        if obj.bar:
            return format_html("<a href='{}' target='_blank'>Bar ID</a>", obj.bar.url)
        return "-"
    preview_bar.short_description = "Bar ID"

    def slot_summary(self, obj):
        return f"{len(obj.available_slots)} day(s)" if obj.available_slots else "No slots"
    slot_summary.short_description = "Slot Summary"


# 📅 Booking Admin
@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('client', 'lawyer', 'scheduled_for', 'status', 'mode', 'location', 'duration')
    list_filter = ('status', 'mode', 'scheduled_for', 'created_at')
    search_fields = ('client__user__username', 'lawyer__user__username', 'location')
    ordering = ('-scheduled_for',)
