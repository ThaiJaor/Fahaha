from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker
from users.models import User
from books.models import Book

class TestSetUp(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.all_cart_url = reverse('cart-list')
        self.cart_detail_url = reverse('cart-detail')
        self.cart_item_detail_url = reverse('cart-item-detail', kwargs={'item_id': 1})
        self.fail_delete_url = reverse('cart-item-detail', kwargs={'item_id': 2})
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
        
        self.cart_data = {
            'user': self.admin_user.id,
            'item_id': self.book.id,
            'total': 1000
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