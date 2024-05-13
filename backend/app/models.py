from django.db import models

# Create your models here.
from django.db import models

# Create your models here.

class Product(models.Model): 
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    stock = models.IntegerField()

    def __str__(self):
        return self.name    

class Order(models.Model):
    id = models.AutoField(primary_key=True)
    products = models.ManyToManyField(Product)
    def __str__(self):
        return f"Order #{self.id}"

class Payment(models.Model):
    id = models.AutoField(primary_key=True) 
    order_id = models.IntegerField(null=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    line1 = models.CharField(max_length=100, null=True)
    line2 = models.CharField(max_length=100, null=True)
    city = models.CharField(max_length=100, null=True)
    country = models.CharField(max_length=100, null=True)
    postal_code = models.CharField(max_length=100, null=True)
    def __str__(self):
        return f"Payment of {self.total} for order #{self.id}"
    
