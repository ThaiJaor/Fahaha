from .test_setup import TestSetUp
from django.urls import reverse
from rest_framework import status

class TestViews(TestSetUp):
    def test_user_cannot_register_with_no_data(self):
        response = self.client.post(self.register_url)
        self.assertEqual(response.status_code, 400)
        
    def test_user_can_register(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        # import pdb; pdb.set_trace()
        self.assertEqual(response.status_code, 201)
        
    def test_user_cannot_login_with_unverified_email(self):
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 401)
        
    def test_user_can_login(self):
        self.client.post(self.register_url, self.user_data, format='json')
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        
    def test_user_can_logout(self):
        self.client.post(self.register_url, self.user_data, format='json')
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        
        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, 200)
        
    def test_user_can_view_info(self):
        self.client.post(self.register_url, self.user_data, format='json')
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        
        response = self.client.get(self.info_url)
        self.assertEqual(response.status_code, 200)
    
    def test_user_can_update_info(self):
        self.client.post(self.register_url, self.user_data, format='json')
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        
        response = self.client.put(self.info_url, {
            'email': self.user_data['email'],
            'username': self.user_data['username'],
            'first_name': 'John',
            'last_name': 'Doe',
            'phone_number': '1234567890'
        }, format='json')
        self.assertEqual(response.status_code, 200)
        
        response = self.client.get(self.info_url)
        self.assertEqual(response.data['first_name'], 'John')
        self.assertEqual(response.data['last_name'], 'Doe')
        self.assertEqual(response.data['phone_number'], '1234567890')
        
    def test_user_cannot_update_info_with_no_data(self):
        self.client.post(self.register_url, self.user_data, format='json')
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        
        response = self.client.put(self.info_url)
        self.assertEqual(response.status_code, 400)
        
    def test_user_cannot_change_password_with_no_data(self):
        self.client.post(self.register_url, self.user_data, format='json')
        response = self.client.post(self.login_url, self.user_data, format='json')
        response = self.client.post(self.change_password_url)
        self.assertEqual(response.status_code, 400)
        
    def test_user_can_change_password(self):
        self.client.post(self.register_url, self.user_data, format='json')
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        
        response = self.client.post(self.change_password_url, {
            'old_password': self.user_data['password'],
            'new_password': 'new_password',
            'confirm_new_password': 'new_password'
        }, format='json')
        self.assertEqual(response.status_code, 200)
        
        response = self.client.post(self.login_url, {
            'email': self.user_data['email'],
            'password': 'new_password'
        }, format='json')
        self.assertEqual(response.status_code, 200)
        
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 401)