from rest_framework.response import Response


def api_response(data=None, message="", success=True, status_code=200, errors=None):
    return Response({
        "success": success,
        "message": message,
        "data": data,
        "errors": errors
    }, status=status_code)