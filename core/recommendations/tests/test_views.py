from .test_setup import TestSetUp
from django.urls import reverse

class TestViews(TestSetUp):
    def test_user_can_get_recommendations(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.recommendations_user_url)
        self.assertEqual(response.status_code, 200)
        
    def test_user_cannot_get_recommendations_if_not_logged_in(self):
        response = self.client.get(self.recommendations_user_url)
        self.assertEqual(response.status_code, 403)
        
    def test_user_cannot_get_book_recommendations_if_not_logged_in(self):
        response = self.client.get(self.recommendations_book_url)
        self.assertEqual(response.status_code, 403)
        
    def test_user_cannot_get_book_recommendations_if_not_registered(self):
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 401)
        
    def test_user_cannot_get_recommendations_if_not_registered(self):
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 401)
        
    def test_user_can_get_book_recommendations(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.recommendations_book_url, format='json')
        self.assertEqual(response.status_code, 200)
