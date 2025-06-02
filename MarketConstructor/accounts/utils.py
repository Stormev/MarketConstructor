from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.response import Response
from rest_framework import status
from .models import Users
from .serializer import UserSerializer
from .models import Users


# Функция полностью принимает responce
def get_user_from_token(request):
    user = None

    try:
        access_token = AccessToken(request.data.get("access_token"))
        user = Users.objects.get(user_id=access_token['user_id'])
    except Exception as err:
        print(err)
        refresh_token = request.data.get("refresh_token")
        if refresh_token:
            try:
                refresh_token = RefreshToken(refresh_token)
                access_token = refresh_token.access_token
                user = Users.objects.get(user_id=access_token['user_id'])
                return user
            except Exception:
                return None
    return user