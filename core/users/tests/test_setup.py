from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker


class TestSetUp(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')
        self.info_url = reverse('user_view')
        self.change_password_url = reverse('change_password')
        self.fake = Faker()
        
        self.user_data = {
            'email': self.fake.email(),
            'username': self.fake.user_name(),
            'password': "123456789",
            'password2': "123456789",
        }
        
        return super().setUp()
    
    def tearDown(self):
        return super().tearDown()