# Generated by Django 5.1.6 on 2025-05-11 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Orders',
            fields=[
                ('order_id', models.AutoField(primary_key=True, serialize=False)),
                ('user_id', models.IntegerField()),
                ('phone', models.CharField(max_length=15)),
                ('buy', models.BooleanField(default=False)),
                ('build', models.BooleanField(default=False)),
                ('setup_devices', models.BooleanField(default=False)),
                ('build_foundation', models.BooleanField(default=False)),
                ('repair', models.BooleanField(default=False)),
                ('create_project', models.BooleanField(default=False)),
                ('terraforming', models.BooleanField(default=False)),
                ('other', models.BooleanField(default=False)),
            ],
        ),
    ]
