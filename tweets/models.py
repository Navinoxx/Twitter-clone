from django.db import models
from django.core.validators import FileExtensionValidator
from django.utils import timezone
from users.models import User

class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tweets')
    content = models.TextField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif'])])
    liked = models.ManyToManyField(User, default=None, blank=True, related_name='liked')
    retweeted = models.ManyToManyField(User, default=None, blank=True, related_name='retweeted')
    bookmarked = models.ManyToManyField(User, default=None, blank=True, related_name='bookmarked')
    created_at = models.DateTimeField(default=timezone.now, help_text='The date and time when the tweet was created.')

    class Meta:
        ordering = ['-created_at']


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments', related_query_name='comment')
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE, related_name='parent')
    body = models.TextField()
    created_at = models.DateTimeField(default=timezone.now, help_text='The date and time when the comment was created.')

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Comments'
        ordering = ['-created_at']