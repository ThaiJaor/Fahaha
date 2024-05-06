from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker
from books.models import Book
from ratings.models import Rating
from users.models import User


class TestSetUp(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.rating_list_url = reverse('rating-list')
        self.rating_detail_url = reverse('rating-detail', kwargs={'pk': 1})
        
        self.fake = Faker()
        
        self.book = Book.objects.create(
            title=self.fake.name(),
            author=self.fake.name(),
            rating=0,
        )
        
        self.rating_data = {
            'book': self.book.id,
            'rating': 5,
            'comment': self.fake.text(),
        }
        
        self.user_data = {
            'email': self.fake.email(),
            'username': self.fake.user_name(),
            'password': "123456789",
            'password2': "123456789",
        }
        
        return super().setUp()
    
    def tearDown(self):
        return super().tearDown()