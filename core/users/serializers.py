from rest_framework import serializers
from django.contrib.auth import get_user_model


class RegisterUserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def save(self):
        if get_user_model().objects.filter(email=self.validated_data['email']).exists():
            raise serializers.ValidationError(
                {'email': 'Email already exists!'})

        user = get_user_model()(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
        )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError(
                {'password': 'Passwords do not match!'})

        user.set_password(password)
        user.save()

        return user


class LoginUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['email', 'password']


class UpdateUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    phone_number = serializers.CharField(required=True)

    class Meta:
        model = get_user_model()
        fields = ['email', 'username', 'last_login',
                  'first_name', 'last_name', 'phone_number']

    def validate_phone_number(self, value):
        if not value.isdigit():
            raise serializers.ValidationError(
                'Phone number must be a number')
        if len(value) < 10 or len(value) > 15:
            raise serializers.ValidationError(
                'Phone number must be between 10 and 15 digits')
        return value


class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_new_password = serializers.CharField(required=True)

    class Meta:
        model = get_user_model()
        fields = ['old_password', 'new_password', 'confirm_new_password']

    def validate(self, attrs):
        if not self.instance.check_password(attrs['old_password']):
            raise serializers.ValidationError(
                {'old_password': 'Password is incorrect.'})

        if attrs['new_password'] != attrs['confirm_new_password']:
            raise serializers.ValidationError(
                {'confirm_new_password': 'Confirm new password wrong'})

        # add contraints of admin django password field
        # if len(attrs['new_password']) < 8:
        #     raise serializers.ValidationError(
        #         {'new_password': 'Password must be at least 8 characters long.'})
        # if attrs['new_password'].isdigit():
        #     raise serializers.ValidationError(
        #         {'new_password': 'Password must contain at least 1 letter.'})
        # if attrs['new_password'].isalpha():
        #     raise serializers.ValidationError(
        #         {'new_password': 'Password must contain at least 1 digit.'})

        return attrs

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['email', 'username', 'last_login', 'first_name', 'last_name',
                  'date_joined', 'is_superuser', 'is_staff', 'is_verify', 'phone_number']
        read_only_fields = ['last_login', 'date_joined',
                            'is_superuser', 'is_staff', 'is_verify']
