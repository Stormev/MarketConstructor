from rest_framework import serializers
from .models import Products


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = "__all__"
        #           ["product_id", "title", "cost", "precost", "prepaid", "address",
        #          "material", "year", "mortgage", "tier", "room_count", "size",
        #          "facing", "service"]

