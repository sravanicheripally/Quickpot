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
        fields = "__all__"

    def clean(self):
        super(DomesticForm, self).clean()
        origin = self.cleaned_data.get('origin')
        if origin > 2:
            self._errors['origin'] = self.error_class([
                'Minimum 5 characters required'])
        return self.cleaned_data

class InternationalForm(forms.ModelForm):
    class Meta:
        model = International
        fields = "__all__"


class ParcelDetailsForm(forms.ModelForm):
    item_weight = forms.CharField(label='item_weight', widget=forms.TextInput(attrs={'placeholder': 'max should be 9kg'}))
    pickup_date = forms.DateField(widget=forms.NumberInput(attrs={'type': 'date'}))

    class Meta:
        model = ParcelDetails
        fields = "__all__"




class OrderDetailsForm(forms.ModelForm):
    class Meta:
        model = OrderDetails
        fields ='__all__'