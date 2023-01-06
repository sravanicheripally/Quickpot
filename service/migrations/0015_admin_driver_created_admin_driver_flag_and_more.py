# Generated by Django 4.0.2 on 2022-12-13 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0014_alter_admin_driver_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='admin_driver',
            name='created',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
        migrations.AddField(
            model_name='admin_driver',
            name='flag',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='admin_driver',
            name='updated',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]