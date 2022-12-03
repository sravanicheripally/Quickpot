from django.contrib import admin
from .models import Domestic,International, ParcelDetails, OrderDetails, Drivers
from django.contrib.auth.models import User


@admin.register(Domestic)
class Domesticadmin(admin.ModelAdmin):
    list_display = ['id', 'origin', 'destination']


@admin.register(International)
class Internationaladmin(admin.ModelAdmin):
    list_display = ['id', 'Destination_country', 'origin', 'destination']


@admin.register(ParcelDetails)
class ParcelAdmin(admin.ModelAdmin):
    list_display = ['user', 'item_weight', 'item_name', 'pickup_date', 'delivery_hand', 'parcel_image']


@admin.register(OrderDetails)
class OrderDetailsadmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'origin', 'destination',
                    'date', 'price', 'image', 'driver', 'status']


@admin.register(Drivers)
class DriversAdmin(admin.ModelAdmin):
    list_display = ['name', 'vehicle_name', 'vehicle_no', 'area', 'phone_no', 'email']
