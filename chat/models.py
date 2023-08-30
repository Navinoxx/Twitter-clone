from django.db import models

class Chat(models.Model):
    from_username = models.CharField(max_length=50)
    to_username = models.CharField(max_length=50)
    message = models.CharField(max_length=150)
    canal = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    to_user_read = models.BooleanField(default=False)
    from_user_read = models.BooleanField(default=True) 

    def __str__(self):
        return f"{self.from_username} -> {self.to_username}: {self.message} [{self.timestamp}] (Canal: {self.canal}, To User Read: {self.to_user_read}, From User Read: {self.from_user_read})"
