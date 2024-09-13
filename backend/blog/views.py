from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, AllowAny

from .models import Blog
from .serializers import BlogSerializer
from .permissions import IsBlogOwner


class BlogViewSet(ModelViewSet):
    serializer_class = BlogSerializer
    queryset = Blog.objects.all().order_by("-created_at")

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [AllowAny()]
        if self.request.method == "POST":
            return [IsAuthenticated()]
        return [IsAuthenticated() and IsBlogOwner()]

    def update(self, request, *args, **kwargs):
        blog: Blog = self.get_object()
        self.check_object_permissions(request, blog)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        blog: Blog = self.get_object()
        self.check_object_permissions(request, blog)
        return super().destroy(request, *args, **kwargs)

    def get_serializer_context(self):
        return {"request": self.request}
