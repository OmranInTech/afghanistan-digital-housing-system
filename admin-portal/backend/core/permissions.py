from rest_framework.permissions import BasePermission


class IsAdminOrInspector(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return (
            user.is_authenticated and
            user.role in ["admin", "inspector"]
        )


class IsAgent(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and user.role == "agent"