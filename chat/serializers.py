from rest_framework import serializers
from . models import Chat

class ChatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        fields = ['id', 'from_username', 'to_username', 'message', 'canal', 'timestamp', 'to_user_read', 'from_user_read']
