from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path("ws/<str:username>/<str:my_username>/", consumers.PersonalChatConsumer.as_asgi()),
]
