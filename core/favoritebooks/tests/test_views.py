from .test_setup import TestSetUp
from django.urls import reverse

class TestViews(TestSetUp):
    def test_user_can_get_favorite_books(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.favorite_books_url)
        self.assertEqual(response.status_code, 200)
        
    def test_user_can_get_favorite_book_if_not_registered(self):
        response = self.client.get(self.favorite_books_url)
        self.assertEqual(response.status_code, 403)
        
    def test_user_can_get_favorite_book_if_not_logged_in(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.get(self.favorite_books_url)
        self.assertEqual(response.status_code, 403)
        
    def test_user_can_put_favor_a_book(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.post(self.favorite_books_url, self.favorite_data, format='json')
        self.assertEqual(response.status_code, 201)
        
    def test_user_cannot_put_favor_a_book_if_not_registered(self):
        response = self.client.post(self.favorite_books_url, self.favorite_data, format='json')
        self.assertEqual(response.status_code, 403)
        
    def test_user_cannot_put_favor_a_book_if_not_logged_in(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.favorite_books_url, self.favorite_data, format='json')
        self.assertEqual(response.status_code, 403)
        
    def test_user_cannot_put_favor_a_book_if_book_does_not_exist(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        self.favorite_data['book'] = 100
        response = self.client.post(self.favorite_books_url, self.favorite_data, format='json')
        self.assertEqual(response.status_code, 400)
        
    # def test_user_can_delete_favorite_book(self):
    #     response = self.client.post(self.register_url, self.user_data, format='json')
    #     self.assertEqual(response.status_code, 201)
    #     response = self.client.post(self.login_url, self.user_data, format='json')
    #     self.assertEqual(response.status_code, 200)
    #     response = self.client.post(self.favorite_books_url, self.favorite_data, format='json')
    #     self.assertEqual(response.status_code, 201)
    #     response = self.client.delete(self.favorite_books_detail_url)
    #     self.assertEqual(response.status_code, 204)
    
    def test_user_cannot_delete_none_existing_favorite_book(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.post(self.favorite_books_url, self.favorite_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.delete(self.favorite_books_detail_url)
        self.assertEqual(response.status_code, 404)