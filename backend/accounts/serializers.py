from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                _("Email is already registered.")
            )
        return value

    def save(self, **kwargs):
        user = super().save(**kwargs)
        user.set_password(self.validated_data["password"])
        user.save()
        return user


class UserSerializerWithTokens(serializers.ModelSerializer):
    access_token = serializers.SerializerMethodField()
    refresh_token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "access_token",
            "refresh_token",
            "username",
            "email",
            "first_name",
            "last_name",
        ]

    @staticmethod
    def get_access_token(user: User):
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token)

    @staticmethod
    def get_refresh_token(user: User):
        refresh = RefreshToken.for_user(user)
        return str(refresh)
