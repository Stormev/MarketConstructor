from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
import time
from accounts.models import UserProducts
from datetime import timedelta

# Время действия услуги
PREORDER_PERIOD = timedelta(days=30*6)  # 6 - кол-во месяцев 30 - дней в месяце

# Время ожидания
SLEEP_TIME = 60 * 60


class Command(BaseCommand):
    help = 'Синхронизирует период пред. оплаты, снимает с учета если срок предоплаты закончился'

    def handle(self, *args, **kwargs):
        print('✅  Фоновый процесс. Сихронизация с системой срока пред.оплаты')
        while True:
            try:
                # Получение всех связей
                product_links = UserProducts.objects.filter(is_preorder=True)
                # Проходим по каждой связи
                for product_link in product_links:
                    created_at = product_link.created_at
                    delta = timezone.now() - created_at
                    # Проверка подлинности
                    # Если промежуток времени превышен тогда происходит проверка на статусы владения?
                    # Если нет => Удаление записи
                    expired = delta > PREORDER_PERIOD
                    protected = product_link.is_own or product_link.is_mortgage
                    if expired:
                        if protected:
                            product_link.is_preorder = False
                            product_link.save()
                        else:
                            product_link.delete()

                time.sleep(SLEEP_TIME)
            except Exception as e:
                print(f"⚠️ Ошибка в синхронизации пред.заказов: {e}")
                time.sleep(SLEEP_TIME)