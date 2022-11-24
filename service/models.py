from django.db import models


class Domestic(models.Model):
        origin =models.IntegerField()
        destination = models.IntegerField()


class International(models.Model):
    Destination_country = models.CharField(max_length=100)
    origin = models.IntegerField()
    destination = models.IntegerField()


class Parcel(models.Model):
    item_weight = models.IntegerField()
    item_name = models.CharField(max_length=200)


sh = (("self",'Self'), ("other", 'Other'))
class Services(models.Model):
    date = models.DateField(null=True)
    delivery_hand = models.CharField(max_length=200, choices=sh)
    image = models.ImageField(upload_to='services')


class Details(models.Model):
    origin = models.IntegerField()
    destination = models.IntegerField()
    Destination_country = models.CharField(max_length=100)
    item_weight = models.IntegerField()
    item_name = models.CharField(max_length=200)
    services = models.CharField(max_length=200)
    date = models.DateField(null=True)
    from_whom = models.CharField(max_length=200, null=True)
    image = models.ImageField()
    price = models.IntegerField(null=True)


class Drivers(models.Model):
    name = models.CharField(max_length=50)
    vehicle_name = models.CharField(max_length=30)
    vehicle_no = models.CharField(max_length=10)
    area = models.CharField(max_length=30)
    phone_no = models.CharField(max_length=10)
    email = models.EmailField()