from django.urls import path
from .views import *

urlpatterns = [
    path('', index),
    path('terms/', terms_of_use, name='terms')
]