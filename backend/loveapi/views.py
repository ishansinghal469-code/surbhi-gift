from .models import *
from rest_framework import generics
from .serializer import *
from datetime import date

class Memoryview(generics.ListCreateAPIView):
    queryset = Memory.objects.all()
    serializer_class = MemorySerializer
class Bookview(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class Outfitview(generics.ListCreateAPIView):
    queryset = Outfit.objects.all()
    serializer_class = OutfitSerializer

class DayManagerview(generics.ListCreateAPIView):
    serializer_class = DayManagerSerializer
    def get_queryset(self):
        return DayManager.objects.filter(date=date.today())

class Taskview(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class Expenseview(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class LoveLetterview(generics.ListCreateAPIView):
    queryset = LoveLetter.objects.all()
    serializer_class = LoveLetterSerializer

class TarotCardview(generics.ListCreateAPIView):
    queryset = TarotCard.objects.all()
    serializer_class = TarotCardSerializer

class TarotReadingview(generics.ListCreateAPIView):
    queryset = TarotReading.objects.all()
    serializer_class = TarotReadingSerializer

class Photoview(generics.ListCreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

class Videoview(generics.ListCreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

class playlistview(generics.ListCreateAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer     

class MemoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Memory.objects.all()
    serializer_class = MemorySerializer
    lookup_field = 'id'

class bookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'id'


class DayManagerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DayManager.objects.all()
    serializer_class = DayManagerSerializer
    lookup_field = 'id'

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = "id"

class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    lookup_field = "id"

class LoveLetterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LoveLetter.objects.all()
    serializer_class = LoveLetterSerializer
    lookup_field = "id"
class TarotCardDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TarotCard.objects.all()
    serializer_class = TarotCardSerializer
    lookup_field = "id"

class TarotReadingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TarotReading.objects.all()
    serializer_class = TarotReadingSerializer
    lookup_field = "id"

class PhotoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    lookup_field = "id"

class VideoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    lookup_field = "id"
class PlaylistDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    lookup_field = "id"

class OutfitDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Outfit.objects.all()
    serializer_class = OutfitSerializer
    lookup_field = "id"