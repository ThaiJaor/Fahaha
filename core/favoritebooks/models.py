from django.db import models

# Create your models here.
class FavoriteBook(models.Model):
    user = models.ForeignKey(
        'users.User', related_name='favorite_books', on_delete=models.CASCADE)
    book = models.ForeignKey(
        'books.Book', related_name='favorite_books', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'FavoriteBook id:{self.id} of {self.user} - {self.book}'