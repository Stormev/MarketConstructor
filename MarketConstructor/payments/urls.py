from django.urls import path, include
from .views import Payment

urlpatterns = [
    path('preorder/', Payment.as_view())
]