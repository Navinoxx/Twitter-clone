from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from .consumers import PersonalChatConsumer

websocket_urlpatterns = [
    path("ws/<str:username>/<str:my_username>/", PersonalChatConsumer.as_asgi()),
]
