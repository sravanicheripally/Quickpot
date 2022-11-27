from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Domestic, International, ParcelDetails, OrderDetails
from django.core.exceptions import ValidationError
import requests


class SignUpForm(UserCreationForm):
    password2 = forms.CharField(label='Confirm Password (again)', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']
        labels = {'email': 'Email'}


class DomesticForm(forms.ModelForm):
    # origin=forms.IntegerField()
    class Meta:
        model = Domestic
        fields = ['origin', 'destination']

    def address_with_pincode(self, pincode):
        response = requests.get(f"https://api.postalpincode.in/pincode/{pincode}").json()
        address = {}
        for i in response:
            address['city'] = i['PostOffice'][0]['Block']
            address['district'] = i['PostOffice'][0]['District']
            address['state'] = i['PostOffice'][0]['State']
        return address

    def clean(self):
        origin = self.cleaned_data.get('origin')
        destination = self.cleaned_data.get('destination')
        try:
            self.address_with_pincode(origin)
        except Exception as e:
            print(e, 'error')
            self.add_error('origin', 'Please enter a valid origin pincode')
        try:
            self.address_with_pincode(destination)
        except Exception as e:
            print(e, 'error')
            self.add_error('destination', 'Please enter valid destination Pincode')

class InternationalForm(forms.ModelForm):
    class Meta:
        model = International
        fields = "__all__"


class ParcelDetailsForm(forms.ModelForm):
    item_weight = forms.IntegerField(widget=forms.NumberInput(attrs={'placeholder': 'Max should be 6kg'}))
    pickup_date = forms.DateField(widget=forms.NumberInput(attrs={'type': 'date'}))

    class Meta:
        model = ParcelDetails
        fields = "__all__"

    def clean(self):
        item_weight = self.cleaned_data['item_weight']
        if item_weight > 6:
            return self.add_error('item_weight', 'Item should be below 6kgs')


class OrderDetailsForm(forms.ModelForm):
    class Meta:
        model = OrderDetails
        fields ='__all__'