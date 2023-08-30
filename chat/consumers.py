import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Chat
from . serializers import ChatSerializer

class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.my_user = self.scope['url_route']['kwargs']['my_username']
        self.other_username = self.scope['url_route']['kwargs']['username']

        if self.my_user > self.other_username:
            self.room_name = f'{self.other_username}-{self.my_user}'
        else:
            self.room_name = f'{self.my_user}-{self.other_username}'

        self.room_group_name = f'chat_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def receive(self, text_data=None):
        data = json.loads(text_data)
        
        if data['type'] == 'mark_as_read':
            from_username = data['from_username']
            to_username = data['to_username']
            if to_username == self.my_user:
                await self.mark_messages_as_read(self.room_group_name, to_username)
        else:
            message = data['message']
            from_username = data['from_username']
            to_username = data['to_username']

            await self.save_message(from_username, to_username, self.room_group_name, message)

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'from_username': from_username,
                    'to_username': to_username
                }
            )

    async def chat_message(self, event):
        message = event['message']
        from_username = event['from_username']
        to_username = event['to_username']

        await self.send(text_data=json.dumps({
            'type': 'chat_message_echo',
            'message': message,
            'from_username': from_username,
            'to_username': to_username            
        }))

    async def disconnect(self, code):
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    @database_sync_to_async
    def save_message(self, from_username, to_username, canal, message):
        serializer = ChatSerializer(data={
            'from_username': from_username,
            'to_username': to_username,
            'message': message,
            'canal': canal,
            'to_user_read': to_username == self.my_user,
            'from_user_read': True 
        })
        if serializer.is_valid():
            serializer.save()

    @database_sync_to_async
    def mark_messages_as_read(self, canal, to_username):
        Chat.objects.filter(canal=canal, to_username=to_username).update(to_user_read=True)
