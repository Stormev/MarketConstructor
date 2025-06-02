from django.db import models


# Create your models here.
class Products(models.Model):
    product_id = models.AutoField(primary_key=True)

    title = models.CharField(max_length=100, null=False, default="Сооружение")
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    precost = models.DecimalField(max_digits=10, decimal_places=2)
    prepaid = models.BooleanField(default=False)

    address = models.CharField(max_length=100)
    material = models.CharField(max_length=50)
    year = models.IntegerField()
    mortgage = models.BooleanField(default=False)
    tier = models.CharField(max_length=50)
    room_count = models.IntegerField()
    size = models.IntegerField()
    facing = models.BooleanField(default=False)
    service = models.BooleanField(default=False)
    description = models.CharField(max_length=2300, default="Нет описания")


class ProductImage(models.Model):
    product = models.ForeignKey(Products, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/')
    alt_text = models.CharField(max_length=100, blank=True)

