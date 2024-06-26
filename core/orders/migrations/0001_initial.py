# Generated by Django 5.0.4 on 2024-05-04 08:23

import django.core.validators
import django.utils.timezone
import orders.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.CharField(default=orders.models.uuid_hex, editable=False, max_length=255, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('total_price', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('status', models.CharField(choices=[('processing', 'Processing'), ('shipping', 'Shipping'), ('delivered', 'Delivered'), ('cancelled', 'Cancelled')], default='processing', max_length=20)),
                ('payment_method', models.CharField(choices=[('VNPAY', 'VNPAY')], default='VNPAY', max_length=20)),
                ('recipient_name', models.CharField(default='', max_length=255)),
                ('phone_number', models.CharField(default='', max_length=15, validators=[django.core.validators.RegexValidator('^\\d{10,15}$', message='Phone number must be between 10 and 15 digits.')])),
                ('shipping_address', models.CharField(max_length=255)),
                ('note', models.TextField(blank=True, default='', null=True)),
                ('payment_transaction_id', models.CharField(max_length=50)),
                ('payment_amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('payment_currency', models.CharField(default='VND', max_length=3)),
                ('items', models.JSONField(default=list)),
            ],
        ),
    ]
