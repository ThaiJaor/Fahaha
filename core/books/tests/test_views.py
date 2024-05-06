from .test_setup import TestSetUp

class TestViews(TestSetUp):
    def test_book_list_admin(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.category_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_book_list_if_logged_in(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.book_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_book_list_if_not_logged_in(self):
        response = self.client.get(self.book_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_book_detail_admin(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.book_detail_url)
        self.assertEqual(response.status_code, 200)
        
    def test_book_detail_if_logged_in(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.book_detail_url)
        self.assertEqual(response.status_code, 200)
        
    def test_book_detail_read_only(self):
        response = self.client.get(self.book_detail_url)
        self.assertEqual(response.status_code, 200)
        
    def test_category_list_admin(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.category_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_category_list_if_logged_in(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.category_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_category_list_if_not_logged_in(self):
        response = self.client.get(self.category_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_category_detail_admin(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.category_detail_url)
        self.assertEqual(response.status_code, 200)
        
    def test_category_detail_if_logged_in(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.category_detail_url)
        self.assertEqual(response.status_code, 200)
        
    def test_category_detail_read_only(self):
        response = self.client.get(self.category_detail_url)
        self.assertEqual(response.status_code, 200)
        
    def test_publisher_list_admin(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.publisher_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_publisher_list_if_logged_in(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.publisher_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_publisher_list_if_not_logged_in(self):
        response = self.client.get(self.publisher_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_publisher_detail_admin(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.publisher_detail_url)
        self.assertEqual(response.status_code, 200)
        
    def test_publisher_detail_if_logged_in(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.publisher_detail_url)
        self.assertEqual(response.status_code, 200)
        
    def test_publisher_detail_read_only(self):
        response = self.client.get(self.publisher_detail_url)
        self.assertEqual(response.status_code, 200)
        
    def test_promotion_list_admin(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.promotion_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_promotion_list_if_logged_in(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.promotion_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_promotion_list_if_not_logged_in(self):
        response = self.client.get(self.promotion_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_promotion_detail_admin(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.promotion_detail_url)
        self.assertEqual(response.status_code, 200)
        
    def test_promotion_detail_if_logged_in(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.promotion_detail_url)
        self.assertEqual(response.status_code, 200)
        
    def test_promotion_detail_if_not_logged_in(self):
        response = self.client.get(self.promotion_detail_url)
        self.assertEqual(response.status_code, 200)
    