# Generated by Django 5.1.6 on 2025-05-29 16:47

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_userproducts_created_at_alter_userproducts_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userproducts',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2025, 5, 29, 16, 47, 32, 952879, tzinfo=datetime.timezone.utc)),
        ),
    ]
