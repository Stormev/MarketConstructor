from django.apps import AppConfig
import sys
import subprocess
import threading
import os


class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'

    def ready(self):
        if 'runserver' in sys.argv:
            def run_sync():
                subprocess.call([sys.executable, 'manage.py', 'sync_payments'])

            threading.Thread(target=run_sync, daemon=True).start()