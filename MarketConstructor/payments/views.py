import time
import datetime
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.utils import get_user_from_token
from yoomoney import Authorize, Client, Quickpay
import secret as conf
from uuid import uuid4
from store.models import Products
from store.serializer import ProductsSerializer
from .models import Payments
from .serializer import PaymentsSerializer
from accounts.models import UserProducts


# Create your views here.
# Платежная система ============================================
class Payment(APIView):
    def __init__(self):
        self.client = None
        self.initClient()

    # Инициализация клиента ============================================
    def initClient(self):
        if conf.yoomoney_api_access_token:
            self.client = Client(conf.yoomoney_api_access_token)

    def post(self, request):
        data = request.data
        user = get_user_from_token(request)
        product = None
        # Валидация данных ============================================

        if not user:
            return Response({'message': "invalid_token"}, status=status.HTTP_401_UNAUTHORIZED)
        if not self.client:
            return Response({'message': "api_payment_client_not_init"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            product = Products.objects.get(product_id=request.data.get("product_id"))
        except Exception as err:
            print(err)
            return Response({'message': "invalid_data_1"}, status=status.HTTP_400_BAD_REQUEST)
        try:

            # Проверка - занят ли продукт?
            if UserProducts.objects.filter(product__product_id=request.data.get("product_id")).first():
                return Response({"message": "product_has_owner"}, status=status.HTTP_409_CONFLICT)
            # Генерация уникального label через UUID4
            unique_label = str(uuid4())

            # Создание платёжной ссылки ============================================
            quickpay = Quickpay(
                receiver=conf.yoomoney_api_receiver,  # номер кошелька ЮMoney
                quickpay_form="shop",  # форма оплаты (shop — универсальная)
                targets=f"Пред. Оплата товара {product.title} Id:{product.product_id}",  # цель платежа
                paymentType="SB",  # тип платежа: AC — банковская карта, PC — кошелёк
                sum=product.precost,  # сумма платежа
                label=unique_label  # метка для отслеживания платежей
            )
            # Сохранение платежа в бд ============================================
            model = Payments.objects.create(
                user=user,
                title=product.title,
                product_id=product.product_id,
                amount=product.cost,
                provider="yoomoney",
                provider_payment_id=unique_label,
                status="pending",
                created_at=datetime.datetime.now(),
                updated_at=datetime.datetime.now(),
                description="Предворительная оплата",
                # error_message="", # В случае ошибки (необязательное поле)
            )

            model.save()

            # Возвращает ссылку на платеж ============================================
            return Response({'link': quickpay.redirected_url})

        except Exception as err:
            print(err)
            return Response({'message': "invalid_data_2"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)