from django.db import models
from django.contrib.auth import get_user_model


# Create your models here.
class Payments(models.Model):
    payment_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)  # кто платит

    product_id = models.CharField(max_length=100, blank=True, null=True)  # ID продукта
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Стоимость

    provider = models.CharField(max_length=50)  # например: 'stripe', 'paypal', 'bank_xyz'
    provider_payment_id = models.CharField(max_length=100, blank=True, null=True)  # ID в системе провайдера

    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Ожидает'),
            ('success', 'Успешно'),
            ('failed', 'Ошибка'),
            ('cancelled', 'Отменено')
        ],
        default='pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    description = models.TextField(blank=True, null=True)  # комментарий или описание
    error_message = models.TextField(blank=True, null=True)  # ошибка от провайдера, если есть
