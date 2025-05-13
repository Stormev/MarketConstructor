from rest_framework import serializers
from .models import Products


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ["product_id", "title", "cost", "precost", "prepaid", "addres",
                  "material", "year", "mortgage", "tier", "room_count", "size",
                  "facing", "service"]

