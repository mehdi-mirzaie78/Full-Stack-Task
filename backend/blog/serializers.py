from rest_framework import serializers
from .models import Blog


class BlogSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Blog
        fields = ("id", "user", "title", "content", "image", "created_at", "updated_at")
        extra_kwargs = {"image": {"required": False, "allow_empty_file": False}}

    def save(self):
        user = self.context["request"].user
        self.validated_data["user"] = user
        return super().save()
