from .test_setup import TestSetUp
from django.urls import reverse

class TestViews(TestSetUp):
    def test_user_can_get_ratings(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.rating_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_user_can_get_ratings_if_not_registered(self):
        response = self.client.get(self.rating_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_user_can_get_ratings_if_not_logged_in(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.get(self.rating_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_user_can_rate_a_book(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.post(self.rating_list_url, self.rating_data, format='json')
        self.assertEqual(response.status_code, 201)
        
    def test_user_cannot_rate_a_book_if_not_registered(self):
        response = self.client.post(self.rating_list_url, self.rating_data, format='json')
        self.assertEqual(response.status_code, 403)
        
    def test_user_cannot_rate_a_book_if_not_logged_in(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.rating_list_url, self.rating_data, format='json')
        self.assertEqual(response.status_code, 403)
        
    def test_user_cannot_get_rating_detail_with_wrong_rating_id(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.rating_detail_url)
        self.assertEqual(response.status_code, 404)
        
    def test_user_cannot_get_rating_detail_with_wrong_rating_id_if_not_registered(self):
        response = self.client.get(self.rating_detail_url)
        self.assertEqual(response.status_code, 404)
        
    def test_user_cannot_get_rating_detail_with_wrong_rating_id_if_not_logged_in(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.get(self.rating_detail_url)
        self.assertEqual(response.status_code, 404)
        