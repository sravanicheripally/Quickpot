from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import ParcelDetails, OrderDetails, Complaint, Drivers
from django.core.exceptions import ValidationError
import requests


class SignUpForm(UserCreationForm):
    password2 = forms.CharField(label='Confirm Password (again)', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']
        labels = {'email': 'Email'}


class DriverSignUpForm(UserCreationForm):
    password2 = forms.CharField(label='Confirm Password (again)', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username']

    def save(self):
        obj = super().save(commit=False)
        obj.is_staff = True
        obj.save()
        return obj







class DomesticForm(forms.Form):
    origin = forms.IntegerField()
    destination = forms.IntegerField()
    labels = {'origin':'origin pincode', 'destination':'destination pincode'}

    def address_with_pincode(self, pincode):
        response = requests.get(f"https://api.postalpincode.in/pincode/{pincode}").json()
        address = {}
        for i in response:
            address['city'] = i['PostOffice'][0]['Block']
            address['district'] = i['PostOffice'][0]['District']
            address['state'] = i['PostOffice'][0]['State']
        return address

    def clean(self):
        origin_pincode = self.cleaned_data.get('origin')
        destination_pincode = self.cleaned_data.get('destination')
        try:
            self.address_with_pincode(origin_pincode)
        except Exception as e:
            print(e, 'error')
            self.add_error('origin_pincode', 'Please enter a valid origin pincode')
        try:
            self.address_with_pincode(destination_pincode)
        except Exception as e:
            print(e, 'error')
            self.add_error('destination_pincode', 'Please enter valid destination Pincode')


class InternationalForm(forms.ModelForm):
    destination_country = forms.CharField()
    origin = forms.IntegerField()
    destination = forms.IntegerField()
    labels = {'destination_country':'destination country', 'origin': 'origin pincode', 'destination': 'destination pincode'}



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





class OrderDetailsForm(forms.ModelForm):
    class Meta:
        model = OrderDetails
        fields = ['status', 'picked']


class ComplaintForm(forms.ModelForm):
    class Meta:
        model = Complaint
        fields = '__all__'

proof_choices = (
    ("Aadhar", "Aadhar"),
    ("Driving_license", "Driving_license"),
    ("Voter_id", "Voter_id"),
    ("pancard", "pancard"),
)


class DriverForm(forms.ModelForm):
    proof_type = forms.ChoiceField(label='proof type', choices=proof_choices)
    proof_id = forms.CharField(max_length=120)
    class Meta:
        model = Drivers
        exclude = ['verified', 'username']
        fields = '__all__'


    def save(self, user):
        obj = super().save(commit=False)
        obj.verified = True
        obj.username = user
        obj.save()
        return obj

    def clean(self):
        proof_type = self.cleaned_data.get('proof_type')
        print(proof_type,'hhhhhhhhhhhhhhhhhhh')
        proof_id = self.cleaned_data.get('proof_id')
        if proof_type == 'Aadhar':
            if len(proof_id) == 12:
                pass
            else:
                return self.add_error('proof_id', 'Aadhar number should be 12 digits only')

        if proof_type == 'Driving_license':
            if len(proof_id) == 12:
                pass
            else:
                return self.add_error('proof_id', 'Driving license number should be 12 digits only')

        if proof_type == 'Voter_id':
            if len(proof_id) == 12:
                print('if')
            else:
                return self.add_error('proof_id', 'Voter id number should be 12 digits only')

        if proof_type == 'pancard':
            if len(proof_id) == 12:
                print('if')
            else:
                return self.add_error('proof_id', 'pancard number should be 12 digits only')