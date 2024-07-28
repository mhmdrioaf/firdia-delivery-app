from django.db import models
from slugify import slugify

from django.contrib.auth.models import User

def generate_product_slug(name):
    slug = slugify(name)
    product_count = Product.objects().filter(slug=slug).count()

    if product_count == 0:
        return slug
    else:
        new_slug = slugify(f"{slug}-{product_count}")
        return new_slug


class Product(models.Model):
    slug = models.CharField(max_length=150, unique=True)
    title = models.CharField(max_length=250, default='')
    archived = models.BooleanField(default=False)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")

    def __str__(self):
        return self.title
