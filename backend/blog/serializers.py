from rest_framework import serializers
from .models import Blog


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ('title', 'content', 'image')

    def save(self, **kwargs):
        user = self.context['request'].user
        self.validated_data['user'] = user
        return super().save(**kwargs)
