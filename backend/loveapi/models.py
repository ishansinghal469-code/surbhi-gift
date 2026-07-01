from django.db import models

class Memory(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    description = models.TextField()
    cover_image = models.ImageField(upload_to='books/')
    created_at = models.DateTimeField(auto_now_add=True)
    rating = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

class Outfit(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='outfits/')
    
    def __str__(self):
        return self.name
    

    
class DayManager(models.Model):

    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    CATEGORY_CHOICES = [
        ('study', 'Study'),
        ('work', 'Work'),
        ('gaming', 'Gaming'),
        ('reading', 'Reading'),
        ('selfcare', 'Self Care'),
        ('craft', 'Craft'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default='other'
    )

    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default='medium'
    )

    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} ({self.date})"
    
class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    due_date = models.DateTimeField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
class Expense(models.Model):

    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    category = models.CharField(
        max_length=20,

    )
    note= models.TextField(blank=True)
    def __str__(self):
        return f"{self.title} - {self.amount}"
    
class LoveLetter(models.Model):
    message = models.TextField()
    title = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.title if self.title else f"Love Letter {self.message[:10]}"
    
class TarotCard(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='tarot_cards/')
    meaning_upright = models.TextField()
    meaning_reversed = models.TextField()
    suit = models.CharField(max_length=50, blank=True)
    arcana = models.CharField(max_length=20)  # Major or Minor

    def __str__(self):
        return self.name
    
class TarotReading(models.Model):
    question = models.CharField(max_length=255)

    cards = models.ManyToManyField(
        TarotCard,
        related_name='readings'
    )

    interpretation = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question
    
class Photo(models.Model):
    image = models.ImageField(upload_to='photos/')
    description = models.TextField(blank=True)
    clicked_at = models.DateTimeField(auto_now_add=True)
    memory = models.ForeignKey(
        Memory,
        on_delete=models.CASCADE,
        related_name='photos'
    )

    def __str__(self):
        return f"Photo {self.id}"


class Video(models.Model):
    video_file = models.FileField(upload_to='videos/')
    description = models.TextField(blank=True)
    recorded_at = models.DateTimeField(auto_now_add=True)
    memory = models.ForeignKey(
        Memory,
        on_delete=models.CASCADE,
        related_name='videos'
    )

    def __str__(self):
        return f"Video {self.id}"
    
    
class Playlist(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    spotify_link = models.URLField()
    cover_image = models.ImageField(
        upload_to='playlists/',
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    



    