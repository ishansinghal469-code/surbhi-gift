from django.urls import path
from . import views

urlpatterns = [
    path('memories/', views.Memoryview.as_view())
]