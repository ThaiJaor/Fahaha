from django.db import models

# Create your models here.


class AnalyticsRevenue(models.Model):
    """Dummy model for revenue analytics"""
    class Meta:
        verbose_name = 'Revenue Analytics'
        verbose_name_plural = 'Revenue Analytics'


class AnalyticsLoginHistory(models.Model):
    """Dummy model for login history analytics"""
    class Meta:
        verbose_name = 'Login History Analytics'
        verbose_name_plural = 'Login History Analytics'
