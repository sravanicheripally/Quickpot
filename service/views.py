import razorpay
from django.shortcuts import render,HttpResponse,HttpResponseRedirect
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from .forms import SignUpForm,DomesticForm,InternationalForm, ParcelDetailsForm,OrderDetailsForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import ParcelDetails, Domestic, OrderDetails, Drivers
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.core.mail import send_mail
from twilio.rest import Client
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import Http404
from django.views.generic import ListView
from datetime import datetime


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
                print(request.session['range'])
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
    fm=OrderDetails.objects.all()
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
    return render(request, "history.html", {'form':fm})


def profiles(request):
    fm = User.objects.all()
    print(fm,'.......................................')
    return render(request,'profiles.html',{'form':fm})


def order_summary(request):
    summary = request.session['summary']
    print(summary)
    return render(request, 'order_summary.html', {'summary': summary})


def payment_details(request):
        print(request.GET)
        try:
            request.session['service'] = request.GET.get('service')
            print(request.session['service'])
        except Exception as e:
            print(e)

        if request.GET.get('service') == 'Standard':
            price = int(request.session['summary']['item_weight'])*120
            request.session['price'] = price
            days = 3
            return render(request, 'payment_details.html', {'price': price, 'days': days})
        if request.GET.get('service') == 'Premium':
            price = int(request.session['summary']['item_weight']) * 250
            request.session['price'] = price
            days = 1
            return render(request, 'payment_details.html', {'price': price, 'days': days})
        return render(request, 'payment_details.html')


def address_enter(request):
    if request.method == 'POST':
        request.session['address'] = request.POST
        print(request.session['address'])
        return HttpResponseRedirect('payment_options')
    return render(request, 'address.html')


def payment_options(request):
    # if request.method == 'POST':
    #     amount  = 50000
    #     order_currency = 'INR'
    #     client = razorpay.Client(auth=('rzp_test_6lrPUDLV0dRFf9', 'OjNBfOuoD0M8yl3Gkeo9YuJK'))
    #     payment = client.order.create({'amount': amount, 'currency': 'INR', 'payment_capture': '1'})
    price = request.session['price']
    delivery_address = ' '
    delivery_address += request.session['address']['delivery_area']+' ,'
    delivery_address += request.session['address']['delivery_location']+', '
    delivery_address += request.session['address']['delivery_pincode']
    print(request.session['range'])
    return render(request, 'payment_options.html', {'price': price, 'delivery': delivery_address})


@csrf_exempt
def success(request):
    print(request.session['range'])
    order = OrderDetails(user=request.user, origin=request.session['range']['origin'], destination=request.session['range']['destination'],
                    item_weight=request.session['summary']['item_weight'],
                    item_name=request.session['summary']['item_name'], date=request.session['summary']['pickup_date'],
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
    msg = f"new order has came please accept and pickup the parcel from {request.session['address']['pickup_area']}" \
          f" and deliver " \
          f"to area = {request.session['address']['delivery_area']} , " \
          f"location = {request.session['address']['delivery_location']},"\
          f"pincode= {request.session['address']['delivery_pincode']} rey message successful ga send ayyinda"
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
    #     to=['+917286853993', '+919966244167']
    # )
    print('message send')
    return render(request, 'success.html', {'order': order})


def sign(request):
    if request.method == "POST":
        fm = SignUpForm(request.POST)
        if fm.is_valid():
            fm.save()

            messages.success(request, 'Account Created Successfully !!')
    else:
        fm = SignUpForm()
    return render(request, 'signup.html', {'form':fm})


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
    return render(request, 'login.html', {'form':fm})
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
    driver = Drivers.objects.all()
    total_orders = len(orders)
    paginator = Paginator(orders, 2, orphans=1)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    for i in driver:
        if i.email == request.session["driver"]:
            driver = i
    return render(request, 'admin_dashboard.html', {'page_obj': page_obj, 'driver': driver, 'total': total_orders})

