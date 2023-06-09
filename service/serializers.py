from rest_framework import serializers
from django.contrib.auth.models import User
from .models import OrderDetails, Admin_driver, Complaint, Drivers_orders, ParcelDetails
from django.contrib.auth import authenticate
from rest_framework.exceptions import ValidationError


class SignupSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    # def validate(self, attrs):
    #     print(attrs)
    #     if len(attrs['password']) != 8:
    #         raise ValidationError('Password must be 8 characters')
    #     return attrs

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
    driver = serializers.CharField(source='driver.name', allow_null=True, required=False)
    user = serializers.CharField(source='user.username', allow_null=True, required=False)
    class Meta:
        model = OrderDetails
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request')
        instance = self.Meta.model(**validated_data)
        instance.user = request.user
        instance.save()
        return instance

    def update(self, instance, validated_data):
        request = self.context.get('request')
        print(validated_data)
        order = self.Meta.model.objects.get(id=instance.id)
        driver = Admin_driver.objects.get(name=request.user)
        order.driver = driver
        order.picked = validated_data['picked']
        order.save()
        return order


class OrderDetailsSerializerPending(serializers.ModelSerializer):
    driver = serializers.CharField(source='driver.name')
    user = serializers.CharField(source='user.username')
    class Meta:
        model = OrderDetails
        fields = '__all__'


class OrderDetailsSerializerPicked(serializers.ModelSerializer):
    driver = serializers.CharField(source='driver.name', allow_null=True)
    user = serializers.CharField(source='user.username')
    class Meta:
        model = OrderDetails
        fields = '__all__'


class OrderDetailsSerializerInProcess(serializers.ModelSerializer):
    driver = serializers.CharField(source='driver.name', allow_null=True)
    user = serializers.CharField(source='user.username')
    class Meta:
        model = OrderDetails
        fields = '__all__'


class OrderDetailsSerializerDelivered(serializers.ModelSerializer):
    driver = serializers.CharField(source='driver.name', allow_null=True)
    user = serializers.CharField(source='user.username')
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


class DriverEntryByAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin_driver
        fields = ['name', 'email', 'phone']

        extra_kwargs = {field: {'required': True} for field in fields}


class DriverSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin_driver
        fields = '__all__'
        extra_kwargs = {field: {'required': True} for field in ['address', 'govt_id', 'password']}
