from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker
from books.models import Book


class TestSetUp(APITestCase):
    def setUp(self):
        self.book = Book.objects.create(
            title="Test Book"
        )
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.recommendations_user_url = reverse('recommendations-user')
        self.recommendations_book_url = reverse('recommendations-book', kwargs={'pk': self.book.id})
        
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