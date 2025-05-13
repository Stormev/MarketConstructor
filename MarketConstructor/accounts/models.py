from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from store.models import Products


# Create your models here.
# Пользователь
class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    phone = models.CharField(max_length=15)
    mail = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)

    def check_password(self, raw):
        return check_password(raw, self.password)

    def __str__(self):
        return self.name


# Связь пользователя и продукта
class UserProducts(models.Model):
    # Поле id автоматические создается
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    is_own = models.BooleanField(default=False)
    is_mortgage = models.BooleanField(default=False)
    is_preorder = models.BooleanField(default=False)
    status = models.CharField(max_length=50)
