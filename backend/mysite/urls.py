from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('marketdata/', include('marketdata.urls')),
    path('trade/', include('trade.urls')),
    path('authentication/', include('authentication.urls')),
    path('admin/', admin.site.urls),
]
