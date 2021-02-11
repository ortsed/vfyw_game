from vfyw.game.models import Location
from django.contrib import admin
import vfyw.settings
media = vfyw.settings.MEDIA_URL

class LocationAdmin(admin.ModelAdmin):
	list_display  = ('title','description',)
admin.site.register(Location,LocationAdmin)