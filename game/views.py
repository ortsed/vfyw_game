from django.template import Context, loader 
from django.http import HttpResponse 
from vfyw.game.models import Location 
from django.conf import settings

def index(request):
        c = Context({'GOOGLE_MAPS_KEY': settings.GOOGLE_MAPS_KEY}, autoescape=False)
        t = loader.get_template('game/index.html') 
        return HttpResponse(t.render(c))


def rand(request):
	from random import randint
	num_locations = Location.objects.count()
	location = Location.objects.all().filter(status='2')[randint(0, num_locations-1)]
	c = Context({'location': location,}, autoescape=False)
	t = loader.get_template('game/json.html') 
	return HttpResponse(t.render(c))


def location(request, id):
	location = Location.objects.get(id, status='2')
	c = Context({ 
	'location': location,
	}, autoescape=False)
	t = loader.get_template('game/json.html') 
	return HttpResponse(t.render(c))
