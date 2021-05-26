from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request):
    return render(request, "render_frontend/index.html")

def terms_of_use(request):
    return render(request, "render_frontend/terms.html")
