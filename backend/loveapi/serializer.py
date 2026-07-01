from rest_framework import serializers
from .models import *

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class OutfitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outfit
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

from datetime import date

class DayManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = DayManager
        fields = "__all__"

    def create(self, validated_data):
        validated_data["date"] = date.today()
        return super().create(validated_data)


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'

class LoveLetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoveLetter
        fields = '__all__'

class TarotCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = TarotCard
        fields = '__all__'

class TarotReadingSerializer(serializers.ModelSerializer):
    cards = TarotCardSerializer(many=True, read_only=True)
    class Meta:
        model = TarotReading
        fields = '__all__'

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

class MemorySerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    videos = VideoSerializer(many=True, read_only=True)

    class Meta:
        model = Memory
        fields = "__all__"

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = '__all__'