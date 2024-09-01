from rest_framework.routers import SimpleRouter
from .views import BlogViewSet

router = SimpleRouter()
router.register(r'blogs', BlogViewSet)

urlpatterns = router.urls
