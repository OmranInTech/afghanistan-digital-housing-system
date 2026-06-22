from rest_framework.routers import DefaultRouter
from .views import DocumentViewSet

router = DefaultRouter()
router.register("", DocumentViewSet)

urlpatterns = router.urls