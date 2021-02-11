from django.db import models

# Create your models here.
class Location(models.Model):
	title = models.CharField(max_length=255)
	latitude = models.CharField(max_length=255)
	longitude = models.CharField(max_length=255)
	image = models.ImageField(upload_to='vfyw/locations/' )
	description = models.TextField(blank=True)
	STATUS_CHOICES = (
	('1', 'Hold'),
	('2','Publish'),
	) 
	status = models.CharField(max_length=1, choices=STATUS_CHOICES)