from .test_setup import TestSetUp

class TestViews(TestSetUp):
    def test_user_can_get_cart(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.all_cart_url)
        self.assertEqual(response.status_code, 200)
        
    def test_user_can_get_cart_detail(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.cart_detail_url)
        self.assertEqual(response.status_code, 200)
        
    def test_user_can_get_cart_item_detail(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.cart_item_detail_url)
        self.assertEqual(response.status_code, 404)
        
    def test_user_can_add_item_to_cart(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.post(self.cart_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 201)
        
    def test_user_cannot_add_item_to_cart_if_not_logged_in(self):
        response = self.client.post(self.cart_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 403)
        
    def test_user_cannot_add_item_to_cart_if_book_does_not_exist(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        self.cart_data['item_id'] = 100
        response = self.client.post(self.cart_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 400)
        
    def test_user_can_update_cart_item(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.post(self.cart_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 201)
        self.cart_data['quantity'] = 2
        response = self.client.put(self.cart_item_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 200)
        
    def test_user_cannot_update_cart_item_if_not_logged_in(self):
        response = self.client.put(self.cart_item_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 403)
        
    def test_user_cannot_update_cart_item_if_book_does_not_exist(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        self.cart_data['quantity'] = 2
        response = self.client.put(self.cart_item_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 404)
        
    def test_user_can_delete_cart_item(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.post(self.cart_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.delete(self.cart_item_detail_url)
        self.assertEqual(response.status_code, 204)
        
    def test_user_cannot_delete_cart_item_if_not_logged_in(self):
        response = self.client.delete(self.cart_item_detail_url)
        self.assertEqual(response.status_code, 403)
        
    def test_user_cannot_delete_none_existing_cart_item(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.delete(self.cart_item_detail_url)
        self.assertEqual(response.status_code, 404)
        
    def test_user_can_delete_cart(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.delete(self.cart_detail_url)
        self.assertEqual(response.status_code, 204)
        
    def test_user_cannot_delete_cart_if_not_logged_in(self):
        response = self.client.delete(self.cart_detail_url)
        self.assertEqual(response.status_code, 403)
        
    def test_user_cannot_delete_none_existing_cart(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.delete(self.fail_delete_url)
        self.assertEqual(response.status_code, 404)
        
    def test_user_can_get_total_price_of_cart(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.cart_detail_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['total_price'], 0)
    
    def test_user_can_get_total_price_of_cart_item(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.post(self.cart_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.get(self.cart_item_detail_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['total_price'], 1000)
        
    def test_user_can_get_total_price_of_cart_item_after_update(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.post(self.cart_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 201)
        self.cart_data['quantity'] = 2
        response = self.client.put(self.cart_item_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.cart_item_detail_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['total_price'], 2000)
        
    def test_user_can_get_total_price_of_cart_after_update(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.post(self.cart_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 201)
        self.cart_data['quantity'] = 2
        response = self.client.put(self.cart_item_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.cart_detail_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['total_price'], 2000)
        
    def test_user_can_get_total_price_of_cart_after_delete(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.post(self.cart_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.delete(self.cart_item_detail_url)
        self.assertEqual(response.status_code, 204)
        response = self.client.get(self.cart_detail_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['total_price'], 0)
        
    def test_user_can_get_total_price_of_cart_item_after_delete(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.post(self.cart_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.delete(self.cart_item_detail_url)
        self.assertEqual(response.status_code, 204)
        response = self.client.get(self.cart_item_detail_url)
        self.assertEqual(response.status_code, 404)
        response = self.client.get(self.cart_detail_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['total_price'], 0)
        
    def test_user_can_get_total_price_of_cart_after_delete_cart(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.post(self.cart_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.delete(self.cart_detail_url)
        self.assertEqual(response.status_code, 204)
        response = self.client.get(self.cart_detail_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['total_price'], 0)
        
    def test_user_can_get_total_price_of_cart_item_after_delete_cart(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.post(self.cart_detail_url, self.cart_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.delete(self.cart_detail_url)
        self.assertEqual(response.status_code, 204)
        response = self.client.get(self.cart_item_detail_url)
        self.assertEqual(response.status_code, 404)
        response = self.client.get(self.cart_detail_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['total_price'], 0)
