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

5. Tải thư viện cần thiết, xài máy ảo thì activate rồi install:

    ```
    pip install -r requirements.txt
    ```

7. Chạy server backend:

    ```
    python manage.py runserver
    ```

### Cách tạo tài khoản admin - superuser:

```
python manage.py createsuperusser
```

### Trang Admin:

Có một tài khoản superuser có sẵn: admin@gmail.com - password:123 (Nếu không vào được là do t tính sai:v)
Để vào trang admin: chạy server backend rồi vào link http://127.0.0.1:8000/admin/ để đăng nhập.


### Implemented APIs

- **Register**: Endpoint for user registration.
- **Login**: Endpoint for user login.
- **Logout**: Endpoint for user logout.
- **Update User Info**: Endpoint for updating user information.
- **View User Info**: Endpoint for viewing user information.
- **Change Password**: Endpoint for changing user password.

For more details, refer to the [API Documentation](https://docs.google.com/spreadsheets/d/1CBAN2GIQ646wWI4Tpgqbdik6lYuNJwh0R_gq_r27MZg/edit#gid=0).
