from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import timedelta
from .models import Products
from .serializer import ProductsSerializer


# Create your views here.
class GetProducts(APIView):
    def get(self, request):
        page = int(request.GET.get('page', 1))
        pagelimit = int(request.GET.get('pagelimit', 10))
        offset = (page - 1) * pagelimit
        model = Products.objects.all()[offset:offset+pagelimit]
        return Response(ProductsSerializer(model, many=True).data, status=status.HTTP_200_OK)


class GetProduct(APIView):
    def get(self, request, pk):
        model = Products.objects.filter(product_id=pk).first()
        if not model:
            return Response({"NotFound_id:": pk}, status=status.HTTP_404_NOT_FOUND)
        return Response(ProductsSerializer(model).data, status=status.HTTP_200_OK)
