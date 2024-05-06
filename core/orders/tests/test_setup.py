from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker
from users.models import User
from orders.models import Order

class TestSetUp(APITestCase):
    def setUp(self):
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
        
        self.order = Order.objects.create(
            user=self.admin_user,
            total_price=1000,
            status='pending'
        )
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.payment_url = reverse('payment-url')
        self.payment_response_url = reverse('payment-response')
        self.all_order_list_url = reverse('all-order-list')
        self.user_order_list_url = reverse('user-order-list')
        self.order_detail_url = reverse('order-detail', kwargs={'pk': self.order.id})
        self.order_detail_url_not_exist = reverse('order-detail', kwargs={'pk': 100})
        
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