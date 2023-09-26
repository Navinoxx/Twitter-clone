from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from chat.consumers import PersonalChatConsumer

websocket_urlpatterns = ProtocolTypeRouter({
    "websocket": URLRouter([
        path("ws/<str:username>/<str:my_username>/", PersonalChatConsumer.as_asgi()),
    ]),
})
