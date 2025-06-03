from waitress import serve
from MarketConstructor.wsgi import application
import subprocess
import sys
import signal

# LockFile - Костыль уже переработан более удобно
# # Лок файлы для для того чтобы фоновые процессы запускались 1 раз (для waitress)
# LOCKFILES = [
#       os.path.join(tempfile.gettempdir(), 'sync_payments.lock'),
#       os.path.join(tempfile.gettempdir(), 'sync_preorder.lock'),
# ]
#
#
# # Чистит папку temp которые были залочены при запуске app.py
# # Для sync_preorder.py и sync_payments.py, обработчик в app.py в обеих приложенях
# def cleanup():
#     for LOCKFILE in LOCKFILES:
#         if os.path.exists(LOCKFILE):
#             os.remove(LOCKFILE)
#
#
# # Вызывается когда программа закрывается
# atexit.register(cleanup)

# Старт фоновых процессов

proc_1 = subprocess.Popen([sys.executable, 'manage.py', 'sync_payments'])
proc_2 = subprocess.Popen([sys.executable, 'manage.py', 'sync_preorder'])


# Для завершения фоновых процессов
def signal_handler(sig, frame):
    proc_1.terminate()
    proc_1.wait()

    proc_2.terminate()
    proc_2.wait()

    sys.exit(0)


signal.signal(signal.SIGINT, signal_handler)

# Конфиг сервера
PORT = "8000"
HOST = "127.0.0.1"

print(f"Сервер запущен по ссылке ======================================"
      f"\n http://{HOST}:{PORT}. Админ: http://{HOST}:{PORT}/admin/"
      f"\n С сертификатом =============================================== "
      f"\n https://{HOST}:{PORT}. Админ: https://{HOST}:{PORT}/admin/")

# Старт через waitress
serve(application, listen=f'{HOST}:{PORT}')
