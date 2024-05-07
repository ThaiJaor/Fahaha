# Generated by Django 5.0.4 on 2024-05-06 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AnalyticsLoginHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'verbose_name': 'Login History Analytics',
                'verbose_name_plural': 'Login History Analytics',
            },
        ),
        migrations.CreateModel(
            name='AnalyticsRevenue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'verbose_name': 'Revenue Analytics',
                'verbose_name_plural': 'Revenue Analytics',
            },
        ),
    ]
