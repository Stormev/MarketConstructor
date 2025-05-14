from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from .models import Users, UserProducts
from .serializer import UserSerializer, UserProductsSerializer
from datetime import timedelta

# Принято решение  хранить токены в local storange тк
# для куки хранения требуется https - заморочка с созданием прокси


class CustomTokenObtainPairView(APIView):
    def post(self, request):
        mail = request.data.get("mail")
        password = request.data.get("password")
        remember = request.data.get("remember")

        try:
            user = Users.objects.get(mail=mail)
        except Users.DoesNotExist:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(password):
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)
        if not remember:
            refresh.set_exp(lifetime=timedelta(seconds=0))
            refresh.access_token.set_exp(lifetime=timedelta(hours=8))
        access_token = str(refresh.access_token)
        return Response({'message': 'success', "access_token": access_token, "refresh_token": str(refresh)},
                        status=status.HTTP_201_CREATED)


class ValidateToken(APIView):
    def post(self, request):
        data = request.data
        access_token = None
        refresh_token = None

        if not data.get("access_token") and not data.get("refresh_token"):
            return Response({'message': "Token is not valid"})

        try:
            access_token = AccessToken(data.get("access_token"))
        except Exception as err:
            print(f"Access токен не валиден: {err}")
        try:
            refresh_token = RefreshToken(data.get("refresh_token"))
        except Exception as err:
            print(f"Refresh токен не валиден: {err}")
            return Response({'message': 'not_valid'}, status=status.HTTP_401_UNAUTHORIZED)

        access_token = refresh_token.access_token
        return Response({'message': 'update_access',
                         "access_token": str(access_token), "refresh_token": str(refresh_token)})


class CreateUser(APIView):
    def post(self, request):
        user = UserSerializer(data=request.data)
        if user.is_valid():
            user = user.save()  # хеширование пароля происходит внутри сериализатора
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({'message': 'success', "access_token": access_token, "refresh_token": str(refresh)},
                            status=status.HTTP_201_CREATED)

        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUserProducts(APIView):
    def post(self, request):
        access_token = request.data.get('access_token')
        user = None

        try:
            access_token = AccessToken(access_token)
            user = Users.objects.get(user_id=access_token['user_id'])
        except Exception as err:
            print(err)
            return Response({'message': "invalid_access_token"}, status=status.HTTP_401_UNAUTHORIZED)

        products = UserProducts.objects.filter(user_id=user.user_id)
        products = UserProductsSerializer(products, many=True)
        return Response({'message': 'success', 'result': products.data})
        ##print('Продукты отстутствуют')
        ##return Response({'message': 'success', 'result': {}})




class GetUserChecks(APIView):
    def post(self, request):
        access_token = None
        user = None
        checks = None
        try:
            access_token = AccessToken(request.data.get("access_token"))
            user = Users.objects.get(user_id=access_token['user_id'])
            checks = None
        except Exception as err:
            print(err)
            return Response({'message': "invalid_access_token"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({'message': 'success', 'result': checks})
