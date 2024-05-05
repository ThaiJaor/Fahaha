from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker


class TestSetUp(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.fake = Faker()
        
        self.user_data = {
            'email': self.fake.email(),
            'username': self.fake.user_name(),
            'password': self.fake.password(),
        }
        
        return super().setUp()
    
    def tearDown(self):
        return super().tearDown()