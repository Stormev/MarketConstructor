# Generated by Django 5.1.6 on 2025-05-13 13:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_alter_users_mail'),
        ('store', '0002_alter_products_room_count_alter_products_size_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProducts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_own', models.BooleanField(default=False)),
                ('is_mortgage', models.BooleanField(default=False)),
                ('is_preorder', models.BooleanField(default=False)),
                ('status', models.CharField(max_length=50)),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.products')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.users')),
            ],
        ),
    ]
