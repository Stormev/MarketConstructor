from rest_framework import serializers
from .models import Payments


class PaymentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payments
        fields = "__all__"
        #  ["payment_id", "user", "product_id", "amount", "provider", "provider_payment_id", "status",
        #          "created_at", "updated_at", "description", "error_message"]
