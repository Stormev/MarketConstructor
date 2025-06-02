from rest_framework import serializers
from .models import Users, UserProducts
from django.contrib.auth.hashers import make_password
from store.serializer import ProductsSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['user_id', 'mail', 'phone']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return Users.objects.create(**validated_data)


class UserProductsSerializer(serializers.ModelSerializer):
    product = ProductsSerializer(many=True, read_only=True)

    class Meta:
        model = UserProducts
        fields = "__all__"
