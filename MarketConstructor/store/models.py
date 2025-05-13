from django.db import models
import sys
import os
project_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), "."))
sys.path.append(project_directory)


# Create your models here.
class Products(models.Model):
    product_id = models.AutoField(primary_key=True)

    title = models.CharField(max_length=100, null=False, default="Сооружение")
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    precost = models.DecimalField(max_digits=10, decimal_places=2)
    prepaid = models.BooleanField(default=False)
    images = models.ImageField(upload_to='products/')

    address = models.CharField(max_length=100)
    material = models.CharField(max_length=50)
    year = models.IntegerField()
    mortgage = models.BooleanField(default=False)
    tier = models.CharField(max_length=50)
    room_count = models.IntegerField()
    size = models.IntegerField()
    facing = models.BooleanField(default=False)
    service = models.BooleanField(default=False)

