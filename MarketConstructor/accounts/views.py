from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from .models import Users, UserProducts
from .serializer import UserSerializer, UserProductsSerializer
from datetime import timedelta
from store.models import Products
from store.serializer import ProductsSerializer
from payments.serializer import PaymentsSerializer

# Получает весь response и возвращает модель User или None
from .utils import get_user_from_token

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
        user = get_user_from_token(request)
        if not user:
            return Response({'message': "invalid_token"}, status=status.HTTP_401_UNAUTHORIZED)

        product_ids = UserProducts.objects.filter(user_id=user.user_id).values_list('product_id', flat=True)
        products = Products.objects.prefetch_related('images').filter(product_id__in=product_ids)
        return Response(ProductsSerializer(products, many=True).data)


class GetUserChecks(APIView):
    def post(self, request):
        user = get_user_from_token(request)
        if not user:
            return Response({'message': "invalid_token"}, status=status.HTTP_401_UNAUTHORIZED)
        checks = user.checks.all()
        return Response(PaymentsSerializer(checks, many=True).data)


class GetUserPreOrder(APIView):
    def post(self, request):
        user = get_user_from_token(request)
        if not user:
            return Response({'message': "invalid_token"}, status=status.HTTP_401_UNAUTHORIZED)

        product_ids = UserProducts.objects.filter(user_id=user.user_id).filter(is_preorder=True)\
            .values_list('product_id', flat=True)
        pre_order = Products.objects.prefetch_related('images').filter(product_id__in=product_ids)
        return Response(ProductsSerializer(pre_order, many=True).data)


class GetUserData(APIView):
    def post(self, request):
        user = get_user_from_token(request)
        if not user:
            return Response({'message': "invalid_token"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(UserSerializer(user).data, status=status.HTTP_200_OK)


class UpdateUserData(APIView):
    def put(self, request):
        user = get_user_from_token(request)
        if not user:
            return Response({'message': "invalid_token"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            if request.data and request.data.get('phone') and request.data.get('mail'):
                if user.phone != request.data.get('phone'):
                    user.phone = request.data.get('phone')

                if user.mail != request.data.get('mail'):
                    user.mail = request.data.get('mail')

                user.save()

            if request.data and request.data.get('old_password') and request.data.get('new_password'):
                valid = user.change_password(request.data.get('old_password'), request.data.get('new_password'))
                if not valid:
                    return Response({'message': "invalid"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as err:
            print(err)
            return Response({'message': "invalid"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'ok'}, status=status.HTTP_200_OK)