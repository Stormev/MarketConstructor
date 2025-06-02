from rest_framework import serializers
from .models import Products, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']


class ProductsSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Products
        fields = "__all__"
        #           ["product_id", "title", "cost", "precost", "prepaid", "address",
        #          "material", "year", "mortgage", "tier", "room_count", "size",
        #          "facing", "service"]

