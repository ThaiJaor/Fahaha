from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework import response
from rest_framework_simplejwt import tokens
from django.contrib.auth import authenticate
from users import serializers, models


def get_user_tokens(user):
    refresh = tokens.RefreshToken.for_user(user)
    return {
        'refresh_token': str(refresh),
        'access_token': str(refresh.access_token)
    }


@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        serializer = serializers.LoginUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
        user = authenticate(email=email, password=password)

        if user is not None:
            tokens = get_user_tokens(user)
            res = response.Response()
            res.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                value=tokens['access_token'],
                expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )
            res.data = {'message': 'Login User Successfully',
                        'access_token': tokens['access_token']}
            res.status_code = status.HTTP_200_OK
            return res
            # return Response(response_user, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def register_view(request):
    if request.method == 'POST':
        serializer = serializers.RegisterUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Register User Successfully', 'data': serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password_view(request):
    if request.method == 'POST':
        serializer = serializers.ChangePasswordSerializer(
            request.user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Change Password Successfully'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    if request.method == 'POST':
        res = Response({'message': 'Logout User Successfully'},
                       status=status.HTTP_200_OK)
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        return res


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_view(request):
    if request.method == 'GET':
        # Kiểm tra lại cho chắc chắn user có trong database
        user = models.User.objects.get(id=request.user.id)
        if user is None:
            return Response({'error': 'User Not Found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'PUT':
        serializer = serializers.UpdateUserSerializer(
            request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Update User Successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
