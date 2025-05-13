from rest_framework import serializers
from .models import Users
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['user_id', 'mail', 'phone', 'password']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return Users.objects.create(**validated_data)


class UserProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"
