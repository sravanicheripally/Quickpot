from django.contrib import admin
from .models import ParcelDetails, OrderDetails, Drivers, Drivers_orders
from django.contrib.auth.models import User


@admin.register(ParcelDetails)
class ParcelAdmin(admin.ModelAdmin):
    list_display = ['user', 'item_weight', 'item_name', 'pickup_date', 'parcel_image']


@admin.register(OrderDetails)
class OrderDetailsadmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'origin', 'destination',
                    'date', 'price', 'status']


@admin.register(Drivers)
class DriversAdmin(admin.ModelAdmin):
    list_display = ['username','vehicle_name', 'vehicle_no', 'area', 'phone_no', 'email', 'verified']


@admin.register(Drivers_orders)
class DriversAdmin(admin.ModelAdmin):
    list_display = ['driver', 'order']


