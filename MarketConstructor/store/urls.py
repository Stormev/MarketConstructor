from django.urls import path, include
from .views import GetProducts, GetProduct

urlpatterns = [
    path('products/', GetProducts.as_view()),
    path('product/<int:pk>/', GetProduct.as_view(), name='product-detail'),
]