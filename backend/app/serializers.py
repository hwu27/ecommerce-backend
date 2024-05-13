from rest_framework import serializers
from .models import Product, Payment, Order

class ProductSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'description')

class OrderSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Order
        fields = ('id', 'products')

class PaymentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Payment
        fields = ('id','order_id', 'total', 'line1', 'line2', 'city', 'country', 'postal_code')
