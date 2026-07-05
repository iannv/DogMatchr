from django.db import models


class BreedImage(models.Model):
    breed_id = models.IntegerField(unique=True)
    breed_name = models.CharField(max_length=255)
    image_path = models.CharField(max_length=500)

    def __str__(self):
        return self.breed_name
