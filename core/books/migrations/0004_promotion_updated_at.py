# Generated by Django 5.0.4 on 2024-05-05 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0003_book_updated_at_alter_book_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='promotion',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]