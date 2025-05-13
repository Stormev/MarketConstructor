from rest_framework import serializers
from .models import Orders


class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = ["order_id", "user_id", "phone", "buy", "build", "setup_devices",
                  "build_foundation", "repair", "create_project", "terraforming", "other"]
