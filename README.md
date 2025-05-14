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
- Данные действия выполняем самостоятельно либо скачиваем docker container
- Web Server - **nginx**, настраиваем root для frontend
- Server - **Uvicorn**, настраиваем root для backend(MarketConstructor) 
- Учтите корень backend начинается сразу а не в подкатерогории MarketConstructor 
---
## 🛠️ Установка и запуск

### 1. 📁 Клонирование репозитория

#### 🟠 Backend (MarketConstructor)
```bash
git clone https://github.com/your-username/your-project.git
cd your-project

# Создать виртуальное окружение (в директории выше backendб где распологается requirements.txt)
python -m venv venv

# Активировать окружение
source venv/bin/activate # Linux/macOS
venv\Scripts\activate # Windows

# Установить зависимости
pip install -r requirements.txt
```
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