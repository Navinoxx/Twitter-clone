from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Chat
from .serializers import ChatSerializer
from users.models import User

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chat(request, username):
    user_obj = request.user
    to_user_obj = User.objects.get(username=username)

    user_username = user_obj.username
    to_user_username = to_user_obj.username

    if user_username > to_user_username:
        canal = f'chat_{to_user_username}-{user_username}'
    else:
        canal = f'chat_{user_username}-{to_user_username}'

    mess = Chat.objects.filter(canal=canal).order_by('timestamp')
    serializer = ChatSerializer(mess, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def unread_message_count(request, username):
    user_obj = request.user 
    to_user_obj = User.objects.get(username=username)

    user_username = user_obj.username
    to_user_username = to_user_obj.username

    unread_messages = Chat.objects.filter(from_username=to_user_username, to_username=user_username, to_user_read=False)
    unread_count = unread_messages.count()
    last_unread_message = unread_messages.order_by('-timestamp').first()

    response_data = {
        "unread_count": unread_count,
    }

    if last_unread_message:
        response_data["last_unread_message"] = {
            "message": last_unread_message.message,
            "timestamp": last_unread_message.timestamp,
        }
    
    return Response(response_data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def has_unread_messages(request):
    unread = Chat.objects.filter(to_username=request.user.username, to_user_read=False)
    unread_messages = unread.count()

    response_data = {
        "has_unread_messages": unread_messages,
    }

    return Response(response_data)
