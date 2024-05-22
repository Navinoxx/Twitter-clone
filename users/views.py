from rest_framework import status
from rest_framework import generics
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from notifications.serializers import NotificationSerializer
from . models import User
from . serializers import MyTokenObtainPairSerializer, MyUserSerializer, UserSerializer, SearchSerializer
from .permissions import IsUserOrReadOnly
from notifications.models import Notification
from rest_framework.exceptions import ValidationError
from django.db import transaction
import cloudinary
import cloudinary.uploader
import cloudinary.api

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_follow(request, username):
    me = request.user
    user = User.objects.get(username=username)

    if user in me.following.all():
        me.following.remove(user)
        return Response({ 'detail': 'Unfollowed' }, status=status.HTTP_200_OK)
    else:
        me.following.add(user)
        noti = Notification(
            type='Ah comenzado a seguirte',
            to_user=user,
            from_user=me
                )
        noti.save()
        serializer = NotificationSerializer(noti, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_recommendations(request):
    excluded_users = User.objects.exclude(username=request.user.username)
    recommended_users = excluded_users.exclude(id__in=request.user.following.all())[:5]
    serializer = SearchSerializer(recommended_users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_users(request):
    query = request.query_params.get('query', None)
    if query is not None:
        users = User.objects.filter(username__icontains=query)
        serializer = SearchSerializer(users, many=True)
        return Response({ 'users': serializer.data })
    else:
        return Response({ 'users': [] })
    
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]
    lookup_field = 'username'
    lookup_url_kwarg = 'username'

    def perform_update(self, serializer):
        user = self.get_object()
        updated_data = serializer.validated_data

        if 'avatar' in updated_data:
            if user.avatar_public_id:
                cloudinary.uploader.destroy(user.avatar_public_id)

        if 'cover_image' in updated_data:
            if user.cover_image_public_id:
                cloudinary.uploader.destroy(user.cover_image_public_id)

        try:
            serializer.save()
        except ValidationError as e:
            raise ValidationError({"detail": e.detail})

class MyTokenObtainPairSerializer(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def user_register(request):
    data = request.data

    if data['password'] != data['confirm_password']:
        return Response({'detail': 'Las contraseñas no coinciden'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=data['username']).exists():
        return Response({'detail': 'El nombre de usuario ya existe'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(email=data['email']).exists():
        return Response({'detail': 'El correo electrónico ya está en uso'}, status=status.HTTP_400_BAD_REQUEST)

    user = User(
        username=data['username'],
        email=data['email'],
        password=make_password(data['password']),
    )
    
    try:
        user.full_clean()
        user.save()
    except ValidationError as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    serializer = MyUserSerializer(user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@transaction.atomic
def user_delete(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    
    try:
        cloudinary.api.delete_resources_by_prefix(f"tweets/{username}/")
        cloudinary.api.delete_resources_by_prefix(f"users/{username}/")
        cloudinary.api.delete_folder(f"tweets/{username}")
        cloudinary.api.delete_folder(f"users/{username}")
    except cloudinary.exceptions.Error as e:
        transaction.set_rollback(True)
        return Response({"error": str(e)}, status=500)
    
    user.delete()
    return Response({"message": "User deleted successfully"})
