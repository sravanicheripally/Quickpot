# Generated by Django 4.0.2 on 2022-11-27 14:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0016_delete_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orderdetails',
            old_name='users',
            new_name='user',
        ),
    ]
