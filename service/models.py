from django.db import models
from django.contrib.auth.models import User, AbstractUser


class ParcelDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,editable=False, null=True)
    item_weight = models.IntegerField()
    item_name = models.CharField(max_length=200)
    pickup_date = models.DateField(null=True)
    parcel_image = models.ImageField(upload_to='images')
    receiver_name = models.CharField(max_length=200, null=True)
    receiver_phone = models.CharField(max_length=200, null=True)


class Drivers(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100, null=True)
    vehicle_name = models.CharField(max_length=30)
    vehicle_no = models.CharField(max_length=10)
    area = models.CharField(max_length=30)
    phone_no = models.CharField(max_length=10)
    email = models.EmailField()
    proof_type = models.CharField(max_length=50, null=True)
    proof_id = models.CharField(max_length=120, null=True)
    verified = models.BooleanField(null=True)

    def __str__(self):
        return self.name


ch = (("started", 'started'), ("in_process", 'in_process'), ("completed", 'completed'))
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
    status = models.CharField(max_length=200, choices=ch, null=True)
    picked = models.BooleanField(null=True)
    receiver_name = models.CharField(max_length=200, null=True)
    receiver_phone = models.CharField(max_length=200, null=True)
    driver = models.OneToOneField(Drivers, on_delete=models.SET_NULL, null=True)
    driver_phone = models.CharField(max_length=11, null=True)


class Complaint(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, editable=False)
    booking_id = models.IntegerField()
    issue = models.TextField()


class Drivers_orders(models.Model):
    driver = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.ForeignKey(OrderDetails, on_delete=models.CASCADE)


