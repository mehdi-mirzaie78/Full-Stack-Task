from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegisterSerializer, UserSerializerWithTokens


class UserRegisterView(APIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializerWithTokens(user).data, status=status.HTTP_201_CREATED)



