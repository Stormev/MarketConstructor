from django.apps import AppConfig
import threading
import subprocess
import sys


class PaymentsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'payments'

    def ready(self):
        if 'runserver' in sys.argv:
            def run_sync():
                subprocess.call([sys.executable, 'manage.py', 'sync_payments'])

            threading.Thread(target=run_sync, daemon=True).start()