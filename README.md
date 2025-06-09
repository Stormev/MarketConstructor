# 🧩 Маркет Плейс React + Django 

Полноценный шаблон для разработки веб-приложений с **React (frontend)** и **Django (MarketConstructor || backend)**. Этот проект разделён на две части — `frontend/` и `backend/`.

---

## 🚀 Быстрый старт

### 📦 Требования

- Python 3.10+
- Node.js 18+
- pip, venv
- npm или yarn
- Git

---

### 🌐 Для Deploy проекта на веб сервера вам понадобится
- Незабудьте создать и настроить БД (Категория ниже)
- Web Server - **nginx**, настраиваем root для frontend (Linux или Windows имеет отдельные настройки. Данное действие проводим самостоятельно)
- Server (wsgi) - **Waitress**
- Чтобы запустить backend найдите **run.py** в backend(MarketConstructor) и запускаем
- Чтобы запустить frontend создаем build (Категория ниже) в nginx указываем frontend.conf root под абсолютный путь к билду. После запускаем nginx (запуск зависит от операционной системы)
---
## 🛠️ Установка и запуск

### 1. 📁 Клонирование репозитория

#### 🟠 Backend (MarketConstructor)
##### Затем приступаем к настройке
```bash
git clone https://github.com/Stormev/MarketConstructor
cd MarketConstructor

# Создать виртуальное окружение (в директории выше backend где распологается requirements.txt)
python -m venv venv

# Активировать окружение
source venv/bin/activate # Linux/macOS
venv\Scripts\activate # Windows

# Установить зависимости
pip install -r requirements.txt
```
---
## ❗ВАЖНОЕ 
##### Перед настройкой проекта, создайте ***secret.py*** в backend(MarketConstructor, рядом с manage.py). В этом файле должны быть такие конфиги.
```bash
yoomoney_api_client_id = "Это id вашего приложения созданного в yoomoney по ссылке https://yoomoney.ru/myservices/new"

yoomoney_api_app_name = "Название вашего приложения, которое отображается покупателю при взаимодействии."

yoomoney_api_client_secret = "Секрет клиента, уникальный ключ, выданный ЮMoney. Для Auth2"

yoomoney_api_access_token = "Токен доступа (Access Token), получаемый после авторизации пользователя."

yoomoney_api_receiver = "Номер кошелька или ID получателя платежей"
```
- Чтобы получить access_token нужно выполнить действия по документации: https://yoomoney.ru/docs/wallet/using-api/authorization/obtain-access-token
- Также, незабудьте поменять джанго токен, он находится в MarketConstructor/MarketConstructor Переменная: SECRET_KEY.
---
## 🔧 Настраиваем базу данных
- В ядре backend (MarketConstructor/MarketConstructor/settings.py) ищем **DATABASES** там установлена по умолчанию **Postgresql** если желаете по альтернативной документации можно поменять **БД**.
- Если оставляем **Postgresql** => скачиваем по ссылке https://www.postgresql.org/download/
- После установки настраиваем хост, порт, пользователь, пароль в settings.py

- Выполняем следующие комманды в папке backend (MarketConstructor)
```bash
# Выполнить миграции
python manage.py migrate

# Запустить сервер
python manage.py runserver
```
---
## 🔵 Frontend
```bash
cd frontend

# Установить зависимости
npm install

# Создать файл окружения
cp .env.example .env

# Запустить React-приложение
npm start

# Дополнительно (для продакшана)
npm run build
```
---
# ❓ Что делать дальше
Теперь, когда проект успешно запущен, вот что ты можешь сделать дальше:

### 🔍 1. Ознакомься со структурой проекта

**Frontend (React):**

- `frontend/src/components/` — Компоненты пользовательского интерфейса
- `frontend/public/` — Статические данные
- `.env` — Настройки среды (например, адрес API)

**Backend (Django):**

- `backend/MarketConstructor` — Основное приложение Django
- `backend/MarketConstructor/urls.py` — Основные маршруты
- `backend/(Название Приложения)` — Логика приложений (модули)
- `backend/(Название Приложения)/models.py` — ORM модели базы данных
- `backend/.env` — Настройки среды (секреты, база данных и т.д.)

---

### ✏️ 2. Измени и перезапусти

Ты можешь изменять код в `frontend/` или `backend/`, и:

- React автоматически обновит страницу.
- Django нужно перезапустить при изменении `.py` файлов (если не используется `runserver` с автообновлением).

---

### 🧪 3. Добавь свои фичи

Примеры того, что ты можешь попробовать:

- 🔧 Добавить новую модель в `models.py`
- 🎨 Создать новый React-компонент
- 🔗 Связать компонент с API через `axios`
- 🕹️ Тестовый запуск на кастомном веб сервере

---

### 🐞 4. Отладка

- React ошибки выводятся в браузере
- Django ошибки видны в терминале
- Используй `console.log` и `print()` для отладки

---

### 📁 5. Работа с Git

Создавай отдельные ветки под задачи:

```bash
git checkout main / master / ветка