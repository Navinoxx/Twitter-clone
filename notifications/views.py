from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_read_notifications(request):
    notifications = Notification.objects.filter(to_user=request.user, is_read=True)
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_unread_notifications(request):
    notifications = Notification.objects.filter(to_user=request.user, is_read=False)
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def mark_notifications_as_read(request, notification_id):
    try:
        notification = Notification.objects.get(id=notification_id, to_user=request.user, is_read=False)
        if notification.is_read == False:
            notification.is_read = True
            notification.save()
        return Response({ 'message': 'Leido' })
    except Notification.DoesNotExist:
        return Response({ 'message': 'Notification not found' })