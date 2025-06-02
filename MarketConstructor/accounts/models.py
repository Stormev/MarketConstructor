from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from store.models import Products
from django.utils import timezone


# Create your models here.
# Пользователь
class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    phone = models.CharField(max_length=15)
    mail = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)

    def check_password(self, raw_password):
        if check_password(raw_password, self.password):
            return True
        return False

    def change_password(self, old_password, new_password):
        if check_password(old_password, self.password):
            self.password = make_password(new_password)
            self.save()
            return True
        return False

    def __str__(self):
        return self.name


# Связь пользователя и продукта
class UserProducts(models.Model):
    # Поле id автоматические создается
    user = models.ForeignKey(Users, related_name='product', on_delete=models.CASCADE)
    product = models.ForeignKey(Products, related_name='link', on_delete=models.CASCADE)
    is_own = models.BooleanField(default=False)
    is_mortgage = models.BooleanField(default=False)
    is_preorder = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default="В процессе приобретения")
