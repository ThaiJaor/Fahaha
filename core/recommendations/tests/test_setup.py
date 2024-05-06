from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker


class TestSetUp(APITestCase):
    def setUp(self):
        self.recommendation_user_url = reverse('recommendations-user')
        self.recommendation_book_url = reverse('recommendations-book', kwargs={'pk': 1})
        
        return super().setUp()
    
    def tearDown(self):
        return super().tearDown()