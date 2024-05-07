from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker
from users.models import User
from books.models import Book
from books.models import Category
from books.models import Publisher
from books.models import Promotion

class TestSetUp(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.book_list_url = reverse('book-list')
        self.book_detail_url = reverse('book-detail', kwargs={'pk': 1})
        self.category_list_url = reverse('category-list')
        self.category_detail_url = reverse('category-detail', kwargs={'pk': 1})
        self.publisher_list_url = reverse('publisher-list')
        self.publisher_detail_url = reverse('publisher-detail', kwargs={'pk': 1})
        self.promotion_list_url = reverse('promotion-list')
        self.promotion_detail_url = reverse('promotion-detail', kwargs={'pk': 1})
        self.fake = Faker()
        
        self.admin_data = {
            'email': "hung@gmail.com",
            'username': "DanTDM",
            'password': "123",
            'is_staff': True,
            'is_superuser': True
        }
        
        self.admin_user = User.objects.create_superuser(
            email=self.admin_data['email'],
            username=self.admin_data['username'],
            password=self.admin_data['password'],
            is_staff=self.admin_data['is_staff'],
            is_superuser=self.admin_data['is_superuser']
        )
        
        self.book = Book.objects.create(
            title=self.fake.name(),
            author=self.fake.name(),
            price=1000
        )
        
        self.category = Category.objects.create(
            name=self.fake.name()
        )
        
        self.publisher = Publisher.objects.create(
            name=self.fake.name()
        )
        
        self.promotion = Promotion.objects.create(
            name=self.fake.name()
        )
        
        self.user_data = {
            'email': self.fake.email(),
            'username': self.fake.user_name(),
            'password': "123456789",
            'password2': "123456789",
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()