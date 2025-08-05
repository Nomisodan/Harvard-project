from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('Capstone.urls')),  # Make sure Capstone/urls.py exists
]