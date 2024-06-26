# Fahaha

Fahaha is a website designed for selling books, inspired by Fahasa.

## Backend

### How to Run the Backend Server


1. Đầu tiên thì đi tới core directory:

    ```
    cd core
    ```

2. AE nên sử dụng môi trường ảo để khi có tải bất cứ gì về thì chỉ có trên môi trường ảo này thôi, ae FE skip tới bước 5 cũng được, còn BE bắt buộc:

   ```
   python -m venv env # Tạo môi trường ảo
   ```
3. Để activate môi trường ảo thì:

    bash
    ```
    source env/Scripts/activate
    ```

    terminal
    ```
    .\env\Scripts\activate
    ```

4. Để rời khỏi môi trường ảo:

    ```
    deactivate
    ```

5. Tải thư viện cần thiết, xài máy ảo thì activate rồi install: (nếu thấy báo thiếu lỗi thì chạy lại)

    ```
    pip install -r requirements.txt
    ```

6.Tạo database (mỗi lần vào đều nên làm lại để cập nhật backend)

    ```
    python manage.py makemigrations
    python manage.py migrate
    ```


7. Chạy server backend:

    ```
    python manage.py runserver
    ```

### Cách tạo tài khoản admin - superuser:

```
python manage.py createsuperuser
```

### IMPORT DỮ LIỆU DATABASE

xong 5,6 thì sẽ làm được

```
    python manage.py import_books imported_data
```

### Cách vào đọc trang docs API

chắc chắn chạy lại bước 5,6,7 để cập nhật backend
```
    pip install -r requirements.txt
    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver
```
truy cập vào link:

- http://127.0.0.1:8000/api/schema/redoc/ để xem docs chi tiết về API (nên đọc cái này) 
- http://127.0.0.1:8000/api/schema/swagger-ui/ để xem API dạng swagger

- Để test thử API, hãy vào http://127.0.0.1:8000/api/user/login/ để đăng nhập.
- Để logout hãy vào http://127.0.0.1:8000/api/user/logout/ để logout. Đây là logout theo SessionID cùng server nên chỉ dùng để test API. Frontend không cần gọi.

- Sau đó, muốn test API nào thì hãy cứ quăng API đó vào trình duyệt, sẽ có giao diện cho AE xem.

- Lưu ý filter book nó ko có ở trễn nên t sẽ tự ghi ở cái document API dưới. [API Documentation](https://docs.google.com/spreadsheets/d/1CBAN2GIQ646wWI4Tpgqbdik6lYuNJwh0R_gq_r27MZg/edit#gid=0).

### Trang Admin:

Dùng tài khoản superuser ở trên để đăng nhập.
Để vào trang admin: chạy server backend rồi vào link http://127.0.0.1:8000/admin/ để đăng nhập.


### Implemented APIs for User

- **Register**: Endpoint for user registration.
- **Login**: Endpoint for user login.
- **Logout**: Endpoint for user logout.
- **Update User Info**: Endpoint for updating user information.
- **View User Info**: Endpoint for viewing user information.
- **Change Password**: Endpoint for changing user password.

For more details, refer to the [API Documentation](https://docs.google.com/spreadsheets/d/1CBAN2GIQ646wWI4Tpgqbdik6lYuNJwh0R_gq_r27MZg/edit#gid=0).



### THANH TOÁN / CHECKOUT

Thẻ ngân hàng:

|                |                      |
|----------------|----------------------|
| Ngân hàng      | NCB                  |
| Số thẻ         | 9704198526191432198  |
| Tên chủ thẻ    | NGUYEN VAN A         |
| Ngày phát hành | 07/15                |
| Mật khẩu OTP   | 123456               |


### UPDATE

Đã tạo CART, ORDER, VNPAY CHECKOUT
Book đã có thuộc tính sold có thể ordering, là thuộc tính số lượng đã bán, update theo mỗi lẫn order hoặc vào admin gán tay/update trực tiếp.


### UPDATE 2 - RECOMMENDATION

Tải lại thư viện
```
pip install -r requirements.txt
```

Nếu lỗi, khả năng là liên quan đến thư viện scikit-surprise, hãy chạy lần lượt lệnh sau

```
pip install --upgrade setuptools wheel

pip cache purge

pip install scikit-surprise --no-build-isolation
```
