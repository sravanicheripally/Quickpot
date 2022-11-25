from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Domestic, International, ParcelDetails, OrderDetails
from django.core.exceptions import ValidationError


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

    def clean(self):
        origin = self.cleaned_data.get('origin')
        destination = self.cleaned_data.get('destination')
        if len(str(origin)) != 6 and len(str(destination)) != 6:
            print(len(str(origin)), len(str(destination)))
            raise forms.ValidationError('pincode should contain 6 numbers')
        if len(str(destination)) != 6:
            print(len(str(origin)), len(str(destination)))
            return self.add_error('destination','This pincode should be 6 numbers')


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