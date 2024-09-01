from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UserRegisterView

urlpatterns = [
    path('auth/register/', UserRegisterView.as_view(), name='user-register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='user-login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='user-refresh-token'),
]
