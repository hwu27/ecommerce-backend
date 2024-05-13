# Generated by Django 5.0.4 on 2024-05-13 00:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('description', models.TextField()),
                ('stock', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total', models.DecimalField(decimal_places=2, max_digits=10, null=True)),
                ('line1', models.CharField(max_length=100, null=True)),
                ('line2', models.CharField(max_length=100, null=True)),
                ('city', models.CharField(max_length=100, null=True)),
                ('country', models.CharField(max_length=100, null=True)),
                ('postal_code', models.CharField(max_length=100, null=True)),
                ('order_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.order')),
            ],
        ),
        migrations.AddField(
            model_name='order',
            name='products',
            field=models.ManyToManyField(to='app.product'),
        ),
    ]