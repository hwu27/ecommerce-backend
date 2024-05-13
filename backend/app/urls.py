from django.urls import path
from . import views
from .views import create_payment
urlpatterns = [
    path("products/", views.ProductViewSet.as_view({"get": "list"}), name="product-list"),
    path("products/<int:pk>/", views.ProductViewSet.as_view({
        "get": "retrieve",
        "put": "update",
        "delete": "destroy"
    }), name="product-detail"),
    path("payments/", views.PaymentViewSet.as_view({"get": "list", "post": "create"}), name="payment-list"),
    path("payments/<int:pk>/", views.PaymentViewSet.as_view({
        "get": "retrieve",
        "put": "update",
        "delete": "destroy"
    }), name="payment-detail"),
    path("orders/", views.OrderViewSet.as_view({"get": "list", "post": "create"}), name="order-list"),
    path("orders/<int:pk>/", views.OrderViewSet.as_view({
        "get": "retrieve",
        "put": "update",
        "delete": "destroy"
    }), name="order-detail"),
    path("calculate-order-total/<int:order_id>/", views.calculate_order_total, name="calculate-order-total"),
    path("create-payment/", create_payment, name='create-payment'),
]
