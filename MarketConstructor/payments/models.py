from django.db import models
from accounts.models import Users


# Create your models here.
class Payments(models.Model):
    payment_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Users, related_name="checks", on_delete=models.CASCADE)  # кто платит
    title = models.CharField(max_length=70)

    product_id = models.CharField(max_length=100, blank=True, null=True)  # ID продукта
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Стоимость

    provider = models.CharField(max_length=50)  # например: 'stripe', 'paypal', 'bank_xyz'
    provider_payment_id = models.CharField(max_length=100, blank=True, null=True)  # ID в системе провайдера

    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Ожидает'),
            ('success', 'Успешно'),
            ('refunded', 'Возврат'),
            ('canceled', 'Отменено'),
            ('in_progress', 'В процессе')
        ],
        default='pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    description = models.TextField(blank=True, null=True)  # комментарий или описание
    error_message = models.TextField(blank=True, null=True)  # ошибка от провайдера, если есть
