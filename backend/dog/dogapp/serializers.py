from rest_framework import serializers
from .models import BreedImage

class BreedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BreedImage
        fields: '__all__'