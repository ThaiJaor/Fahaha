from django.db import models

# Create your models here.


class AnalyticsRevenue(models.Model):
    """Dummy model for revenue analytics"""
    class Meta:
        verbose_name = 'Revenue Analytics'
        verbose_name_plural = 'Revenue Analytics'
