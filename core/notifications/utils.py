from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string
from books.models import Promotion
from orders.models import Order
from users.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


def send_email(subject, message, to_email):
    email = EmailMessage(
        subject, message, settings.EMAIL_HOST_USER, [to_email])
    email.fail_silently = False
    email.send()


class Notification:
    @staticmethod
    def new_user_notification(user):
        subject = 'Welcome to FAHAHA!'
        message = render_to_string(
            'newUser.html', {'user': user})

        to_email = user.email
        send_email(subject, message, to_email)

    @staticmethod
    def new_order_notification(order):
        subject = 'You have a new order at FAHAHA!'
        message = render_to_string(
            'newOrder.html', {'order': order})
        to_email = order.user.email
        send_email(subject, message, to_email)

    @staticmethod
    def new_promotion_notification(promotion, user):
        subject = 'New promotion at FAHAHA!'
        message = render_to_string('newPromotion.html', {
                                   'promotion': promotion, 'user': user})
        to_email = user.email
        send_email(subject, message, to_email)


@receiver(post_save, sender=User)
def new_user_handler(sender, instance, created, **kwargs):
    if created:
        Notification.new_user_notification(instance)


@receiver(post_save, sender=Order)
def new_order_handler(sender, instance, created, **kwargs):
    if created:
        Notification.new_order_notification(instance)


@receiver(post_save, sender=Promotion)
def new_promotion_handler(sender, instance, created, **kwargs):
    users = User.objects.all()
    for user in users:
        Notification.new_promotion_notification(instance, user)
