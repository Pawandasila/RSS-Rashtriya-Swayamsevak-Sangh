from rest_framework.serializers import ModelSerializer
from .models import Payment

class PaymentSerializer(ModelSerializer):
    class Meta:
        model = Payment
        exclude = ['timestamp', 'payment_id', 'status']  # Exclude fields that are auto-generated or not needed during creation