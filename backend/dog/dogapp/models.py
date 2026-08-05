from django.db import models


############ RAZAS NINJA ############
class BreedNinja(models.Model):
    breed_id = models.IntegerField(primary_key=True, unique=True)
    name = models.CharField()
    image_link = models.CharField()
    good_with_children = models.IntegerField()
    good_with_other_dogs = models.IntegerField()
    shedding = models.IntegerField()
    grooming = models.IntegerField()
    drooling = models.IntegerField()
    coat_length = models.IntegerField()
    good_with_strangers = models.IntegerField()
    playfulness = models.IntegerField()
    protectiveness = models.IntegerField()
    trainability = models.IntegerField()
    energy = models.IntegerField()
    barking = models.IntegerField()
    min_life_expectancy = models.FloatField()
    max_life_expectancy = models.FloatField()
    max_height_male = models.FloatField()
    max_height_female = models.FloatField()
    max_weight_male = models.FloatField()
    max_weight_female = models.FloatField()
    min_height_male = models.FloatField()
    min_height_female = models.FloatField()
    min_weight_male = models.FloatField()
    min_weight_female = models.FloatField()
    
    def __str__(self):
        return self.name

############ IMAGENES ############
class BreedImage(models.Model):
    breed_id = models.IntegerField(unique=True)
    breed_name = models.CharField(max_length=255)
    image_path = models.CharField(max_length=500)

    def __str__(self):
        return self.breed_name
