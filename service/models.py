from django.db import models
from django.contrib.auth.models import User, AbstractUser


class Domestic(models.Model):
        origin =models.IntegerField()
        destination = models.IntegerField()


class International(models.Model):
    Destination_country = models.CharField(max_length=100)
    origin = models.IntegerField()
    destination = models.IntegerField()


sh = (("self", 'Self'), ("other", 'Other'))


class ParcelDetails(models.Model):
    item_weight = models.IntegerField()
    item_name = models.CharField(max_length=200)
    pickup_date = models.DateField(null=True)
    delivery_hand = models.CharField(max_length=200, choices=sh)
    parcel_image = models.ImageField(upload_to='images')





ch = (("pending", 'pending'), ("picked", 'picked'), ("completed", 'completed'))
class OrderDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, editable=False)
    origin = models.IntegerField()
    destination = models.IntegerField()
    Destination_country = models.CharField(max_length=100,null=True, editable=False)
    item_weight = models.IntegerField()
    item_name = models.CharField(max_length=200)
    services = models.CharField(max_length=200)
    date = models.DateField(null=True)
    from_whom = models.CharField(max_length=200, null=True)
    image = models.ImageField(null=True, editable=False)
    price = models.IntegerField(null=True)
    status = models.CharField(max_length=200, null=True)
    picked = models.BooleanField()

class Drivers(models.Model):
    name = models.CharField(max_length=50)
    vehicle_name = models.CharField(max_length=30)
    vehicle_no = models.CharField(max_length=10)
    area = models.CharField(max_length=30)
    phone_no = models.CharField(max_length=10)
    email = models.EmailField()

class Status(models.Model):
    deiver_name = models.CharField(max_length=10)
    driver_mob = models.CharField(max_length=10)






