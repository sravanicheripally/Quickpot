from rest_framework import serializers
from django.contrib.auth.models import User
from .models import OrderDetails, Admin_driver, Complaint, Drivers_orders, ParcelDetails
from django.contrib.auth import authenticate


class SignupSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(allow_blank=True)
    last_name = serializers.CharField(allow_blank=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class ParcelDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParcelDetails
        exclude = ['parcel_image']


class OrderDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetails
        fields = '__all__'


class Admin_driverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin_driver
        fields = '__all__'


class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'


class Drivers_ordersSerializer(serializers.ModelSerializer):
    driver = serializers.CharField(source='driver.username')
    order = serializers.CharField(source='order.item_name')
    class Meta:
        model = Drivers_orders
        depth = 2
        fields = '__all__'
