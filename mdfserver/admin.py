from django.contrib import admin
from django.db import models
from mdfserver.models import Page, Subpage
from tinymce.widgets import TinyMCE

# Register your models here.
class SubpagesAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': TinyMCE(attrs={'cols': 140, 'rows': 60}, )}
    }

    fieldsets = [
        (None,      {'fields': ['title']}),
        ('Content', {'fields': ['content']}),
    ]

class PageAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': TinyMCE(attrs={'cols': 140, 'rows': 60}, )}
    }

    fieldsets = [
        (None,      {'fields': ['title']}),
        ('Content', {'fields': ['content']}),
    ]

admin.site.register(Page, PageAdmin)
admin.site.register(Subpage, SubpagesAdmin)