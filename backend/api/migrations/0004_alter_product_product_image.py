# Generated by Django 5.0.7 on 2024-07-29 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_product_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='product_image',
            field=models.ImageField(default=None, upload_to='uploads/product/images', verbose_name='product_image'),
        ),
    ]