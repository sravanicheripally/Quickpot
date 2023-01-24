from service.serializers import *
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed, NotAcceptable, ValidationError
from rest_framework.response import Response
import jwt
import requests
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from django.contrib.auth import login, logout
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
import requests


class ParcelDetailsdetails(ModelViewSet):
    queryset = ParcelDetails.objects.all()
    serializer_class = ParcelDetailsSerializer
    # authentication_classes = [BasicAuthentication]
    # permission_classes = [IsAuthenticated]


class AdminDriverView(ModelViewSet):
    queryset = Admin_driver.objects.all()
    serializer_class = Admin_driverSerializer


class OrderdetailsView(ModelViewSet):
    queryset = OrderDetails.objects.all()
    serializer_class = OrderDetailsSerializer


class OrderdetailsPendingView(ModelViewSet):
    queryset = OrderDetails.objects.filter(picked=None)
    serializer_class = OrderDetailsSerializerPending


class OrderdetailsPickedView(ModelViewSet):
    queryset = OrderDetails.objects.filter(picked=True)
    serializer_class = OrderDetailsSerializerPicked


class OrderdetailsProcessView(ModelViewSet):
    queryset = OrderDetails.objects.filter(picked=True, status='in_process')
    serializer_class = OrderDetailsSerializerInProcess


class OrderdetailsDeliveredView(ModelViewSet):
    queryset = OrderDetails.objects.filter(picked=True, status='completed')
    serializer_class = OrderDetailsSerializerDelivered


class Drivers_ordersView(ModelViewSet):
    queryset = Drivers_orders.objects.all()
    serializer_class = Drivers_ordersSerializer


class ComplaintView(ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer


class Signup(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = SignupSerializer


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        print(username,password)
        user = User.objects.filter(username=username).first()
        if user is not None:
            if user.check_password(password):
                login(request, user)
                print(request.user)
                return Response({
                    'status': 'success',
                    'data': {'user': username},
                    'is_superuser': user.is_superuser,
                    'is_staff': user.is_staff,
                    'message': 'login successful'
                })
            else:
                raise AuthenticationFailed('Incorrect Password')
        else:
            raise AuthenticationFailed('user not found')

        # payload = {
        #     'id': user.id,
        #     'exp': datetime.utcnow()+timedelta(minutes=5),
        #     'iat': datetime.utcnow()
        # }
        # token = jwt.encode(payload, 'secret', algorithm='HS256')
        # response = Response()
        # response.set_cookie(key='jwt', value=token, httponly=True)
        # print(request.COOKIES)
        # response.data = {
        #     'jwt': token
        # }


class UserView(APIView):
    def get(self, request):
        print(request.COOKIES)
        token = request.COOKIES.get('jwt')
        print(token, '--------')
        if not token:
            print('no=======')
            raise AuthenticationFailed('Unauthenticated User')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except Exception as e:
            print(e, 'yes------------')
            raise AuthenticationFailed('Unauthenticated user')

        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)


class PincodeView(APIView):
    def post(self, request):
        origin_pin = request.data.get('origin_pincode')
        destination_pin = request.data.get('destination_pincode')
        origin = requests.get(f"https://api.postalpincode.in/pincode/{origin_pin}").json()
        destination = requests.get(f"https://api.postalpincode.in/pincode/{destination_pin}").json()
        if destination[0]['Status'] == 'Success' and origin[0]['Status'] == 'Success':
            return Response({
                'status': 'success',
                'data': {'origin_pincode': origin_pin,
                         'destination_pincode': destination_pin},
                'message': 'Pincode validation successful'
            })
        else:
            raise ValidationError({
                'status': 'failure',
                'data': None,
                'message': 'Invalid Pincodes'
            })


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        print('yes')
        return Response('logged out succefully')


class ServiceView(APIView):
    def post(self, request):
        price, days = 0, ''
        if request.data.get('service') == 'standard':
            price = 500
            days = '3 to 4 days'
        else:
            price = 800
            days = '1 to 2 days'
        return Response({
            'status': 'Success',
            'data': {
                'price': price,
                'days': days
            }
        })


class GetAddressView(APIView):
    def get(self, request):
        pincode = request.data.get('pincode')
        response = requests.get(f"https://api.postalpincode.in/pincode/{pincode}").json()
        if response[0]['Status'] != 'Error':
            for i in response:
                response = {
                    'Mandal': i['PostOffice'][0]['Block'],
                    'District': i['PostOffice'][0]['District'],
                    'State': i['PostOffice'][0]['State']
                }
        return Response({
            'status': 'success',
            'data': response
        })
