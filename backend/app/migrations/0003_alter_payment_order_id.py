# Generated by Django 5.0.4 on 2024-05-13 01:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_alter_payment_order_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='order_id',
            field=models.IntegerField(null=True),
        ),
    ]