from django.urls import path, include
from .views import OrdersViewSet

urlpatterns = [
    path('', OrdersViewSet.as_view())
]