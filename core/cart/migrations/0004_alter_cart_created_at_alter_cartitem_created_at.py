<<<<<<< HEAD
# Generated by Django 5.0.4 on 2024-05-05 17:09
=======
# Generated by Django 5.0.4 on 2024-05-05 17:51
>>>>>>> f7f6e503e0551f4f551ce002f320076adab31413

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0003_cartitem_created_at_cartitem_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='cartitem',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
