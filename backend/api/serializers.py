from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'image', 'archived', 'description', 'created_at', 'seller', 'slug']
        extra_kwargs = {"seller": {"read_only": True}, "slug": {"read_only": True}}
        
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        
        return user