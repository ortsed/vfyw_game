from django.conf.urls import *
import settings
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^vfyw/', include('vfyw.foo.urls'))
	(r'^rand/?','vfyw.game.views.rand'),
	(r'^location/?','vfyw.game.views.location'),

    # Uncomment the admin/doc line below to enable admin documentation:
     (r'^admin/doc/', include('django.contrib.admindocs.urls')),
	
    # Uncomment the next line to enable the admin:
    (r'^admin/?', include(admin.site.urls)),
    (r'^$','vfyw.game.views.index'),
	
)

#if settings.DEBUG:
urlpatterns += patterns('',
	(r'^media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
)
