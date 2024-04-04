from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework import response
from rest_framework_simplejwt import tokens, models as jwt_models
from django.contrib.auth import authenticate
from users import serializers
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils import timezone
from rest_framework_simplejwt.tokens import AccessToken, OutstandingToken


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
            user.last_login = timezone.now()
            user.save()
            tokens = get_user_tokens(user)
            res = response.Response()
            serializer = serializers.UserSerializer(user)
            res.data = {
                'detail': 'Login User Successfully',
                'data': {
                    'user': serializer.data,
                    'access_token': tokens['access_token']
                },
            }
            res.status_code = status.HTTP_200_OK
            return res
            # return Response(response_user, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def register_view(request):
    if request.method == 'POST':
        serializer = serializers.RegisterUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'detail': 'Register User Successfully', 'data': serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def change_password_view(request):
    if request.method == 'POST':
        serializer = serializers.ChangePasswordSerializer(
            request.user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'detail': 'Change Password Successfully'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def logout_view(request):
    if request.method == 'POST':
        try:
            res = Response({'detail': 'Logout User Successfully'},
                           status=status.HTTP_200_OK)
            access_token_str = request.META.get(
                'HTTP_AUTHORIZATION').split(' ')[1]
            return res
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def user_view(request):
    print(request.user.is_authenticated)
    print(request.META.get('HTTP_Referrer'))
    if request.method == 'GET':
        serializer = serializers.UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'PUT':
        serializer = serializers.UpdateUserSerializer(
            request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'detail': 'Update User Successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
