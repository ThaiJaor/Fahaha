from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator


class User(AbstractUser):
    is_verify = models.BooleanField(default=False)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15, default='', validators=[
        RegexValidator(
            r'^\d{10,15}$', message='Phone number must be between 10 and 15 digits.')
    ])
    username = models.CharField(max_length=255)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return f'id: {self.id} - email: {self.email}'
