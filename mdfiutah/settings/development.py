from mdfiutah.settings.base import *

DATABASE_PATH = os.path.join('db.sqlite3')
DATABASES['default']['NAME'] = DATABASE_PATH;

DEBUG = True
TEMPLATE_DEBUG = True

STATIC_URL = '/static/'

SITE_URL = ''

STATIC_ROOT = 'static/'