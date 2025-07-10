from rest_framework import permissions

class IsLawyer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'lawyer'