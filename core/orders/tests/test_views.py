from .test_setup import TestSetUp

class TestViews(TestSetUp):
    def test_order_list_if_user_is_not_admin(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.all_order_list_url)
        self.assertEqual(response.status_code, 403)
    
    def test_order_list(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.all_order_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_order_detail_not_found(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.order_detail_url_not_exist)
        self.assertEqual(response.status_code, 404)
            
    def test_order_detail_if_order_id_not_exist(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.order_detail_url)
        self.assertEqual(response.status_code, 403)
        
    def test_order_detail(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.order_detail_url)
        self.assertEqual(response.status_code, 200)
        
    def test_all_orders_list_if_user_is_not_admin(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.all_order_list_url)
        self.assertEqual(response.status_code, 403)
        
    def test_all_orders_list(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.all_order_list_url)
        self.assertEqual(response.status_code, 200)
    
    def test_vnpay_payment_url_if_user_is_not_admin(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.payment_url)
        self.assertEqual(response.status_code, 200)
    
    def test_vnpay_payment_url(self):
        response = self.client.post(self.login_url, self.admin_data, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.client.get(self.payment_url)
        self.assertEqual(response.status_code, 200)
        