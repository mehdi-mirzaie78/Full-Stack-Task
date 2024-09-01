from rest_framework import serializers
from .models import Blog


class BlogSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Blog
        fields = ("id", "user", "title", "content", "image", "created_at", "updated_at")

    def save(self, **kwargs):
        user = self.context["request"].user
        self.validated_data["user"] = user
        return super().save(**kwargs)
