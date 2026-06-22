from rest_framework.permissions import BasePermission


class IsAdminOrInspector(BasePermission):
    """
    Only admin or inspector can approve/reject workflows
    """

    def has_permission(self, request, view):
        user = request.user

        return (
            user.is_authenticated and
            user.role in ["admin", "inspector"]
        )