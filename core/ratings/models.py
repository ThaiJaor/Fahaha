from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator
from books.models import Book
from users.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save


class Rating(models.Model):
    user = models.ForeignKey(
        User, related_name='ratings', on_delete=models.CASCADE)
    book = models.ForeignKey(
        Book, related_name='ratings', on_delete=models.CASCADE)
    rating = models.IntegerField(default=0, validators=[RegexValidator(
        r'^[0-5]$', message='Rating must be between 0 and 5 stars.')])
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user} rated {self.book} {self.rating} stars.'


# update Book rating and rating_count when a new rating is created
@receiver(post_save, sender=Rating)
def update_book_rating(sender, instance, created, **kwargs):
    if created:
        book = instance.book
        book.rating = (book.rating * book.rating_count +
                       instance.rating) / (book.rating_count + 1)
        book.rating_count += 1
        book.save()
