from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Orders
from rest_framework import status
from .serializer import OrdersSerializer


# Create your views here.
class OrdersViewSet(APIView):
    def post(self, request):
        data = request.data
        model = OrdersSerializer(data=data)
        if model.is_valid():
            model.save()
            return Response({'response': "success"}, status=status.HTTP_201_CREATED)
        return Response({'response': "not_valid"}, status=status.HTTP_400_BAD_REQUEST)