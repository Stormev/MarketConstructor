from django.urls import path, include
from .views import (CustomTokenObtainPairView,
                    CreateUser, ValidateToken, GetUserProducts,
                    GetUserChecks, GetUserPreOrder, GetUserData,
                    UpdateUserData)

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Логин
    path('create/', CreateUser.as_view(), name='create_user'),  # Логин
    path('token/refresh/', ValidateToken.as_view(), name='token_refresh'),
    path('product/', GetUserProducts.as_view(), name='products'),
    path('checks/', GetUserChecks.as_view(), name='checks'),
    path('preorder/', GetUserPreOrder.as_view(), name='preorder'),
    path('user/', GetUserData.as_view(), name='user_data'),
    path('user/update', UpdateUserData.as_view(), name='user_update'),
]