from django.core.management.base import BaseCommand, CommandError
from yoomoney import Client
from payments.models import Payments
from datetime import timedelta, datetime
from django.utils import timezone
import secret as conf
import time
from accounts.models import UserProducts
from store.models import Products

ACCESS_TOKEN = conf.yoomoney_api_access_token
SLEEP_TIME = 10


class Command(BaseCommand):
    help = 'Синхронизирует платежи с ЮMoney и обновляет статусы заказов'

    def handle(self, *args, **kwargs):
        print("Запущен фоновой скрипт синхронизации с ЮMoney")
        if not ACCESS_TOKEN:
            raise CommandError("ACCESS TOKEN ОТСУТСТВУЕТ")

        client = Client(ACCESS_TOKEN)
        while True:
            try:
                history = client.operation_history()
                for op in history.operations:
                    if not op.label:
                        continue
                    if op.status == "success":
                        payment = Payments.objects.filter(provider_payment_id=op.label).first()
                        if payment and payment.status != "success":
                            payment.status = "success"
                            payment.updated_at = timezone.now()
                            payment.save()

                            product = Products.objects.get(product_id=payment.product_id)
                            user = payment.user
                            new_user_product = UserProducts(
                                user=user,
                                product=product,
                                is_preorder=True,
                                status="В процессе приобретения",
                            )
                            new_user_product.save()
                            print(f"✅ Заказ {payment.id} оплачен!")

                time.sleep(SLEEP_TIME)

            except Exception as e:
                print(f"⚠️ Ошибка в синхронизации: {e}")
                time.sleep(SLEEP_TIME)