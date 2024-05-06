from django.db import models
from books.models import Book
from users.models import User

# Create your models here.
class FavoriteBook(models.Model):
    user = models.ForeignKey(
        User, related_name='favorite_books', on_delete=models.CASCADE)
    book = models.ForeignKey(
        Book, related_name='favorite_books', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'FavoriteBook id:{self.id} of {self.user} - {self.book.id}'