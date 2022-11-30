import razorpay
from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from .forms import SignUpForm, DomesticForm, InternationalForm, ParcelDetailsForm, StatusForm, OrderDetailsForm, ComplaintForm
from .forms import DriverSignUpForm, DriverForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import ParcelDetails, Domestic, OrderDetails, Drivers, Status, Complaint
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.core.mail import send_mail
from twilio.rest import Client
from django.core.paginator import Paginator
from datetime import *
import requests
from django.contrib import messages
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
import jwt
from .serializers import UserSerializer


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.POST.get('email')
        password = request.POST.get('password')
        print(password)
        user = User.objects.filter(email=email).first()
        user.set_password(password)
        if user is None:
            raise AuthenticationFailed('user not found')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect Password')

        payload = {
            'id': user.id,
            'exp': datetime.utcnow()+timedelta(minutes=5),
            'iat': datetime.utcnow()
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        print(request.COOKIES)
        response.data = {
            'jwt': token
        }
        return response


class UserView(APIView):
    def get(self, request):
        print(request.COOKIES)
        token = request.COOKIES.get('jwt')
        print(token, '--------')
        if not token:
            raise AuthenticationFailed('Unauthenticated User')

        try:
            payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        except:
            raise AuthenticationFailed('Unauthenticated user')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


def base(request):
    return render(request, 'base.html')


def home(request):
    if request.method == 'POST':
        range = request.session['range']
        if range == 'Domestic':
            form = DomesticForm(request.POST)
            if form.is_valid():
                request.session['range'] = request.POST
                print(request.POST)
                return HttpResponseRedirect('parcel')
            else:
                return render(request, 'home.html', {'form': form, 'range': range})
    range = request.GET.get('range')
    if range == 'Domestic':
        form = DomesticForm
        request.session['range'] = range
    else:
        request.session['range'] = range
        form = InternationalForm
    return render(request, 'home.html', {"form": form, 'range': range})


@login_required(login_url='login')
def parcel(request):
    print(request.session['range'])
    if request.method == 'POST':
        request.session['summary'] = request.POST
        form = ParcelDetailsForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('summary')
        else:
            return render(request, 'parcel.html', {'parcel_form': form})
    parcel_form = ParcelDetailsForm
    return render(request, 'parcel.html', {'parcel_form': parcel_form})


def booking(request):
    fm = OrderDetails.objects.all().filter(user=request.user)
    paginator = Paginator(fm, 2, orphans=1)
    page_number = request.GET.get('page')
    order_page = paginator.get_page(page_number)
    return render(request, 'booking.html', {'order_page': order_page})


def tracking(request):
    return render(request, 'tracking.html')


def history(request):
    print(request.GET)
    date = request.GET.get('payment')

    def mdy_to_ymd(d):
        return datetime.strptime(d, '%b. %d, %Y').strftime('%Y-%m-%d')

    print(mdy_to_ymd(date))
    fm = OrderDetails.objects.filter(date=mdy_to_ymd(date))
    print(request.GET.get('payment'))
    for i in fm:
        print(i.date)
    return render(request, "history.html", {'form': fm})


def profiles(request):
    fm = User.objects.all()
    print(fm, '.......................................')
    return render(request, 'profiles.html', {'form': fm})


def order_summary(request):
    summary = request.session['summary']
    print(summary)
    return render(request, 'order_summary.html', {'summary': summary})


def payment_details(request):
    request.session['address'] = {}
    print(request.GET)
    try:
        request.session['service'] = request.GET.get('service')
        print(request.session['service'])
    except Exception as e:
        print(e)

    if request.GET.get('service') == 'Standard':
        price = int(request.session['summary']['item_weight']) * 120
        request.session['price'] = price
        days = 3
        return render(request, 'payment_details.html', {'price': price, 'days': days})
    if request.GET.get('service') == 'Premium':
        price = int(request.session['summary']['item_weight']) * 250
        request.session['price'] = price
        days = 1
        return render(request, 'payment_details.html', {'price': price, 'days': days})
    return render(request, 'payment_details.html')


# def address_enter(request):
#     if request.method == 'POST':
#         request.session['address'] = request.POST
#         print(request.session['address'])
#         return HttpResponseRedirect('payment_options')
#     return render(request, 'address.html')

def address_enter(request):
    def address_with_pincode(pincode):
        response = requests.get(f"https://api.postalpincode.in/pincode/{pincode}").json()
        address = {}
        for i in response:
            address['city'] = i['PostOffice'][0]['Block']
            address['district'] = i['PostOffice'][0]['District']
            address['state'] = i['PostOffice'][0]['State']
        return address

    if request.method == 'GET':
        print(request.GET)
        if 'pickup_pincode' in request.GET:
            try:
                paddress = address_with_pincode(request.GET['pickup_pincode'])
                request.session['ppincode'] = request.GET['pickup_pincode']
            except Exception as e:
                print(e, '-')
                messages.success(request, 'Enter correct pincode')
                return render(request, 'address.html')
            pickup_context = {'pcity': paddress['city'], 'pdistrict': paddress['district'], 'pstate': paddress['state']}
            request.session['address']['pickup'] = pickup_context
        if 'delivery_pincode' in request.GET:
            print('delivery')
            try:
                daddress = address_with_pincode(request.GET['delivery_pincode'])
                request.session['dpincode'] = request.GET['delivery_pincode']
            except Exception as e:
                print(e, '--')
                messages.error(request, 'Enter correct pincode')
                return render(request, 'address.html')
            delivery_context = {'dcity': daddress['city'], 'ddistrict': daddress['district'],
                                'dstate': daddress['state']}
            request.session['address']['delivery'] = delivery_context
        if 'address' in request.session:
            request.session.modified = True
            if 'pickup' in request.session['address'] and 'delivery' in request.session['address']:
                pickup = request.session['address']['pickup']
                delivery = request.session['address']['delivery']
                context = {'pcity': pickup['pcity'], 'pdistrict': pickup['pdistrict'], 'pstate': pickup['pstate'],
                           'dcity': delivery['dcity'], 'ddistrict': delivery['ddistrict'], 'dstate': delivery['dstate'],
                           'ppincode': request.session['ppincode'], 'dpincode': request.session['dpincode']}
                return render(request, 'address.html', context)
            if 'pickup' in request.session['address']:
                pickup = request.session['address']['pickup']
                print(pickup)
                context = {'pcity': pickup['pcity'], 'pdistrict': pickup['pdistrict'], 'pstate': pickup['pstate'],
                           'ppincode': request.session['ppincode']}
                return render(request, 'address.html', context)
            if 'delivery' in request.session['address']:
                delivery = request.session['address']['delivery']
                context = {'dcity': delivery['dcity'], 'ddistrict': delivery['ddistrict'], 'dstate': delivery['dstate'],
                           'dpincode': request.session['dpincode']}
                return render(request, 'address.html', context)

        return render(request, 'address.html')

    if request.method == "POST":
        print(request.POST)
        if 'pickup' in request.session['address'] and 'delivery' in request.session['address']:
            return HttpResponseRedirect('payment_options')
        else:
            messages.error(request, 'enter all fields')
            return render(request, 'address.html')


def payment_options(request):
    # if request.method == 'POST':
    #     amount  = 50000
    #     order_currency = 'INR'
    #     client = razorpay.Client(auth=('rzp_test_6lrPUDLV0dRFf9', 'OjNBfOuoD0M8yl3Gkeo9YuJK'))
    #     payment = client.order.create({'amount': amount, 'currency': 'INR', 'payment_capture': '1'})
    price = request.session['price']
    delivery_address = ' '
    delivery_address += request.session['address']['delivery']['dcity'] + ' ,'
    delivery_address += request.session['address']['delivery']['ddistrict'] + ', '
    delivery_address += request.session['dpincode']
    print(request.session['range'])
    return render(request, 'payment_options.html', {'price': price, 'delivery': delivery_address})


@csrf_exempt
def success(request):
    print(request.session['range'])
    order = OrderDetails(user=request.user, origin=request.session['range']['origin'],
                         destination=request.session['range']['destination'],
                         item_weight=request.session['summary']['item_weight'],
                         item_name=request.session['summary']['item_name'],
                         date=request.session['summary']['pickup_date'],
                         from_whom=request.session['summary']['delivery_hand'],
                         services=request.session['service'],
                         price=request.session['price'], status='started')
    order.save()
    drivers = Drivers.objects.all()
    drivers_emails = []
    drivers_phones = []
    for i in drivers:
        print(i.email)
        drivers_emails.append(i.email)
        drivers_phones.append(i.phone_no)
        print(i.phone_no)
    msg = f"new order has came please accept and pickup the parcel from {request.session['address']['pickup']['pcity']}" \
          f" and deliver " \
          f"to area = {request.session['address']['delivery']['dcity']} , " \
          f"location = {request.session['address']['delivery']['ddistrict']}," \
          f"pincode= {request.session['dpincode']} rey message successful ga send ayyinda"
    # send_mail(
    #     'sending mail regarding new order',
    #         msg,
    #     'ravindrareddy72868@gmail.com',
    #     [drivers_emails[1]],
    #     fail_silently=False,
    # )
    request.session['driver'] = drivers_emails[1]
    # client = Client('AC2bf4c0d59ce8e22adaf36f66db8e94d7', '75b5458d5839d0732541b151c35b6f72')
    # message = client.messages.create(
    #     body=msg,
    #     from_='+17816508594',
    #     to='+917286853993'
    # )
    # print('message send')
    return render(request, 'success.html', {'order': order})


def sign(request):
    if request.method == "POST":
        fm = SignUpForm(request.POST)
        if fm.is_valid():
            fm.save()

            messages.success(request, 'Account Created Successfully !!')
    else:
        fm = SignUpForm()
    return render(request, 'signup.html', {'form': fm})


def logins(request):
    if not request.user.is_authenticated:
        if request.method == "POST":
            fm = AuthenticationForm(request=request, data=request.POST)
            if fm.is_valid():
                uname = fm.cleaned_data['username']
                upass = fm.cleaned_data['password']
                user = authenticate(username=uname, password=upass)
                if user is not None:
                    login(request, user)
                    messages.success(request, 'Logged in successfully !!')
                    return HttpResponseRedirect('/hom')
        else:
            fm = AuthenticationForm()
        return render(request, 'login.html', {'form': fm})
    else:
        return HttpResponseRedirect('/sign')


def profile(request):
    if request.user.is_authenticated:
        return render(request, 'profile.html', {'name': request.user})
    else:
        return HttpResponseRedirect('/login')


def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/sign')


def admin_dashboard(request):
    orders = OrderDetails.objects.all().order_by('id')
    for order in orders:
        print(order.user)
        print(order.picked)
    driver = Drivers.objects.all()
    total_orders = len(orders)
    paginator = Paginator(orders, 2, orphans=1)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'admin_dashboard.html', {'page_obj': page_obj, 'driver': driver, 'total': total_orders})


def driver_dashboard(request):
    request.session['sta'] = request.POST
    orders = OrderDetails.objects.filter(picked=False).order_by('id')
    print(orders)
    paginator = Paginator(orders, 2, orphans=1)
    page_number = request.GET.get('page')
    orders = paginator.get_page(page_number)
    return render(request, 'driver_dashboard.html', {'all': orders})


def edit(request, id):
    model = OrderDetails.objects.get(pk=id)
    print(model.user)
    form = OrderDetailsForm(instance=model)
    if request.method == 'POST':
        form = OrderDetailsForm(request.POST, instance=model)
        if form.is_valid():
            form.save()
        return HttpResponseRedirect('/driver_dashboard')
    else:
        return render(request, 'edit.html', {'form': form})


def driver_signup(request):
    fm = DriverSignUpForm
    if request.method == 'POST':
        fm = DriverSignUpForm(request.POST)
        if fm.is_valid():
            fm.save()
            return HttpResponseRedirect('login')
    return render(request, 'driversignup.html', {'fm': fm})


def driver_details(request):
    form = DriverForm
    if request.method == 'POST':
        form = DriverForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('driver_dashboard')
    return render(request, 'driverdetails.html', {'form': form})


def complaint(request):
    if request.method == 'POST':
        form = ComplaintForm(request.POST)
        if form.is_valid():
            book = form.cleaned_data['booking_id']
            iss = form.cleaned_data['issue']
            reg = Complaint(booking_id=book, issue=iss, user=request.user)
            reg.save()
            form = ComplaintForm()
    else:
        form = ComplaintForm()
    stud = Complaint.objects.filter(user=request.user)
    return render(request, 'complaint.html', {'form': form, 'stu': stud})


def list_drivers(request):
    drivers = Drivers.objects.all()
    return render(request, 'list_drivers.html', {'drivers': drivers})


def user_complaints(request):
    comp = Complaint.objects.all()
    return render(request, 'user_complaints.html', {'comp': comp})
