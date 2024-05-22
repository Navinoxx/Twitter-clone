import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from chat.routing import websocket_urlpatterns
from channels.security.websocket import AllowedHostsOriginValidator
from channels.auth import AuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_asgi_application()

application = ProtocolTypeRouter({
    'websocket': 
    AllowedHostsOriginValidator(AuthMiddlewareStack(URLRouter(
        websocket_urlpatterns
    ))),
})