import os
from django.db import models
from django.dispatch import receiver
from slugify import slugify

from django.contrib.auth.models import User

def image_upload_path(instance, filename):
    extension = filename.split('.')[-1]
    filename_slug = slugify(instance.title)
    new_filename = "product/images/%s_thumbnail.%s" % (filename_slug, extension)
    
    return new_filename

class Product(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=250, default='')
    image = models.ImageField(verbose_name='image', name="image", upload_to=image_upload_path, blank=True)
    archived = models.BooleanField(default=False)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        super(Product, self).save(*args, **kwargs)
        
        if not self.slug:
            self.slug = slugify(self.title) + "-" + str(self.id)
            self.save()


@receiver(models.signals.post_delete, sender=Product)
def auto_delete_image_on_delete(sender, instance, **kwargs):
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)
            

@receiver(models.signals.pre_save, sender=Product)
def auto_delete_image_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False
    
    try:
        old_file = Product.objects.get(pk=instance.pk).image
    except Product.DoesNotExist:
        return False
    
    new_file = instance.image
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)