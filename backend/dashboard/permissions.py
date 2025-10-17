from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_admin_account)

class IsStaff(BasePermission):
    """
    Allows access only to authenticated staff users.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff_account)
    
class IsFieldWorker(BasePermission):
    """
    Allows access only to authenticated field worker users.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_field_worker)
    
class IsAdminOrIsStaff(BasePermission):
    """
    Custom permission to allow access only to Admin OR Staff users.
    """
    def has_permission(self, request, view):
        # We assume IsAdmin and IsStaff are separate classes you've defined
        is_admin = IsAdmin().has_permission(request, view)
        is_staff = IsStaff().has_permission(request, view)
        
        # Return True if EITHER is True
        return is_admin or is_staff