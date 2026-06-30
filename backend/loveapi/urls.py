from django.urls import path
from . import views

urlpatterns = [
    path('memories/', views.Memoryview.as_view()),
    path('books/', views.Bookview.as_view()),
    path('outfits/', views.Outfitview.as_view()),
    path('daymanager/', views.DayManagerview.as_view()),
    path('tasks/', views.Taskview.as_view()),
    path('expenses/', views.Expenseview.as_view()),
    path('loveletters/', views.LoveLetterview.as_view()),
    path('tarotcards/', views.TarotCardview.as_view()),
    path('tarotreadings/', views.TarotReadingview.as_view()),
    path('photos/', views.Photoview.as_view()),
    path('videos/', views.Videoview.as_view()),
    path('playlists/', views.playlistview.as_view()),

    path('memories/<int:id>/', views.MemoryDetailView.as_view(), name='memory-detail'),
    path('books/<int:id>/', views.bookDetailView.as_view(), name='book-detail'),
    path('daymanager/<int:id>/', views.DayManagerDetailView.as_view(), name='daymanager-detail'),
    path('tasks/<int:id>/', views.TaskDetailView.as_view(), name='task-detail'),
    path('expenses/<int:id>/', views.ExpenseDetailView.as_view(), name='expense-detail'),
    path('loveletters/<int:id>/', views.LoveLetterDetailView.as_view(), name='loveletter-detail'),
    path('tarotcards/<int:id>/', views.TarotCardDetailView.as_view(), name='tarotcard-detail'),
    path('tarotreadings/<int:id>/', views.TarotReadingDetailView.as_view(), name='tarotreading-detail'),
    path('photos/<int:id>/', views.PhotoDetailView.as_view(), name='photo-detail'),
    path('videos/<int:id>/', views.VideoDetailView.as_view(), name='video-detail'),
    path('playlists/<int:id>/', views.PlaylistDetailView.as_view(), name='playlist-detail'),
    path('outfits/<int:id>/', views.OutfitDetailView.as_view(), name='outfit-detail'),
]