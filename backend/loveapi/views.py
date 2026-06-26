from .models import *
from rest_framework import generics
from .serializer import *


class Memoryview(generics.ListCreateAPIView):
    queryset = Memory.objects.all()
    serializer_class = MemorySerializer