from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import timedelta
from .models import Products, ProductImage
from .serializer import ProductsSerializer
from django.db.models import Prefetch
from django.db.models import Count


# Create your views here.
class GetProducts(APIView):
    def get(self, request):
        page = int(request.GET.get('page', 1))
        pagelimit = int(request.GET.get('limit', 10))

        def to_bool(val):
            return str(val).strip().lower() in ['true', '1', 'yes']

        # фильтры
        max_cost = request.GET.get('maxcost')
        checks = request.GET.getlist('checks[]')
        select = request.GET.getlist('select[]')

        offset = (page - 1) * pagelimit
        mode = []
        if max_cost and max_cost.isdigit() and checks and select:
            try:

                more_rooms, facing, mortgage, sale = to_bool(checks[0]), to_bool(checks[1]), \
                    to_bool(checks[2]), to_bool(checks[3])
                material, city, structure_type, size = int(select[0]), int(select[1]), \
                    int(select[2]), int(select[3]),

                model = Products.objects.prefetch_related(
                    Prefetch('images', queryset=ProductImage.objects.order_by('id'))
                ).annotate(link_count=Count('link')) \
                    .filter(link_count=0).filter(cost__lte=float(max_cost))

                if facing:
                    model = model.filter(facing=facing)
                if more_rooms:
                    model = model.filter(room_count__gt=1)

                model = model[offset:offset + pagelimit]

            except Exception as err:
                print(err)
        else:
            model = Products.objects.prefetch_related(
                Prefetch('images', queryset=ProductImage.objects.order_by('id'))
            ).annotate(link_count=Count('link')).filter(link_count=0)[offset:offset+pagelimit]

        return Response(ProductsSerializer(model, many=True).data, status=status.HTTP_200_OK)


class GetProduct(APIView):
    def get(self, request, pk):
        model = Products.objects.prefetch_related('images').filter(product_id=pk).first()
        if not model:
            return Response({"NotFound_id:": pk}, status=status.HTTP_404_NOT_FOUND)
        return Response(ProductsSerializer(model).data, status=status.HTTP_200_OK)
