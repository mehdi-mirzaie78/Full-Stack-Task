from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, AllowAny
from .models import Blog
from .serializers import BlogSerializer


class BlogViewSet(ModelViewSet):
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_serializer_context(self):
        return {'request': self.request}

