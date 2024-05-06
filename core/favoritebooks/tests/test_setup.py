from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker
from books.models import Book
from users.models import User

class TestSetUp(APITestCase):
    def setUp(self):
        self.fake = Faker()

        self.user = User.objects.create(  # Assuming you have a User model imported
            username=self.fake.user_name(),
            email=self.fake.email(),
            password="123456789"
        )

        self.book = Book.objects.create(
            title=self.fake.name(),
            author=self.fake.name(),
        )

        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.favorite_books_url = reverse('favorite-books')
        self.favorite_books_detail_url = reverse('favorite-books-detail', kwargs={'pk': self.book.id})

        self.favorite_data = {
            'user': self.user.id,  # Using self.user.id after creating the user
            'book': self.book.id
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