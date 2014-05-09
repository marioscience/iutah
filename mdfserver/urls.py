__author__ = 'Mario'

from django.conf.urls import patterns, url

from mdfserver import views

urlpatterns = patterns('',
        url(r'^$', views.index, name='index'),
        url(r'^index/', views.index, name='index'),
        url(r'^river_info/(?P<database>[\w\s]*)/(?P<site_code>[\w\s]*[/]?)/$', views.river_dynamic, name='dynamic'),
        url(r'^(?P<pages_passed>[\w\s]*)/(?P<subpage>[\w\s]*[/]?)/$', views.subpages, name='subpages'),
        url(r'^(?P<pages_passed>[\w\s]*[/]?)/$', views.pages, name='pages')
        #url(r'^(?P<pages>[^\s]+)/$', views.pages, name='pages')
)