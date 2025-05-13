from django.db import models


# Create your models here.
class Orders(models.Model):
    order_id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(null=True)
    user_name = models.CharField(max_length=50)  # одностронная свзязь неподходит тк форму отправить
    # может пользователь без авторизации
    phone = models.CharField(max_length=15)
    # Boolean
    buy = models.BooleanField(default=False)
    build = models.BooleanField(default=False)
    setup_devices = models.BooleanField(default=False)
    build_foundation = models.BooleanField(default=False)
    repair = models.BooleanField(default=False)
    create_project = models.BooleanField(default=False)
    terraforming = models.BooleanField(default=False)
    other = models.BooleanField(default=False)
