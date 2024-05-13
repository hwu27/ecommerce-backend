from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, Payment
from .serializers import ProductSerializer, PaymentSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Order, Product
import os
import json
import stripe

# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class OrderViewSet(viewsets.ViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

def calculate_order_total(order_id):
    order = get_object_or_404(Order, id=order_id)
    order_products = Product.objects.filter(order=order)
    total = 0

    for product in order_products:
        total += product.price
    return total

stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')
@csrf_exempt
def create_payment(request):
    if (request.method == 'POST'):
        data = json.loads(request.body)
        items = data['items']
        order = Order.objects.create()
        for item in items:
            product = Product.objects.get(name=item['name'])
            order.products.add(product)

        try:
            order_total = calculate_order_total(order.id)
            intent = stripe.PaymentIntent.create(
                amount=int(order_total * 100),
                currency='usd',
            )
            return JsonResponse({
                'clientSecret': intent['client_secret'],
                'order': order.id,
                'total': order_total
            })
        except Exception as e:
            print(e)
            return JsonResponse({'error': str(e)}, status=403)

