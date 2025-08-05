from .views import layout_view, index_view, logout_view
from django.urls import path

urlpatterns = [
    path('', layout_view, name='layout'),
    path('index/', index_view, name='index'),
    path('logout/', logout_view, name='logout'),
    path('login/', layout_view, name='login'), 
]