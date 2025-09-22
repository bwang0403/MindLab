from django.contrib import admin
from django.urls import path
from django.shortcuts import render

# 简单视图函数
def home(request):
    return render(request, "pracai/home.html")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home, name="home"),  # http://127.0.0.1:8000/ → home.html
]
