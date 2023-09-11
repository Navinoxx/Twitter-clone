from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from . models import Tweet, Comment
from users.models import User
from . serializers import TweetSerializer, MyTweetSerializer, CommentSerializer
from .permissions import IsUserOrReadOnly
from backend.pagination import CustomPagination
from notifications.models import Notification
import cloudinary
import cloudinary.uploader

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        tweet = Tweet.objects.get(id=pk)
        return tweet

    def get(self, request, pk):
        tweet = self.get_object(pk)
        comments = Comment.objects.filter(tweet=tweet)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def create(self, request, pk):
        tweet = self.get_object(pk)
        data = request.data
        comment = Comment(
            user=request.user,
            body=data['body'],
            tweet=tweet
                )
        comment.save()
        if request.user != tweet.user:
            Notification.objects.get_or_create(type='Ah comentado tu publicación', tweet=tweet, to_user=tweet.user, from_user=request.user)
        serializer = CommentSerializer(comment, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_likes(request, username):
    user = User.objects.get(username=username)
    tweets = Tweet.objects.filter(liked=user)
    serializer = MyTweetSerializer(tweets, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_rt(request, username):
    user = User.objects.get(username=username)
    tweets = Tweet.objects.filter(retweeted=user)
    serializer = MyTweetSerializer(tweets, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like(request, pk):
    tweet = Tweet.objects.get(pk=pk)
    if request.user in tweet.liked.all():
        tweet.liked.remove(request.user)
    else:
        tweet.liked.add(request.user)
        if request.user != tweet.user:
            Notification.objects.get_or_create(type='Ah indicado que le gusta tu publicación', tweet=tweet, to_user=tweet.user, from_user=request.user)
    return Response({'status': 'ok'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rt(request, pk):
    tweet = Tweet.objects.get(pk=pk)
    if request.user in tweet.retweeted.all():
        tweet.retweeted.remove(request.user)
    else:
        tweet.retweeted.add(request.user)
        if request.user != tweet.user:
            Notification.objects.get_or_create(type='Ah compartido tu publicación', tweet=tweet, to_user=tweet.user, from_user=request.user)
    return Response({'status': 'ok'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_tweets(request, username):
    user = User.objects.get(username=username)
    tweets = Tweet.objects.filter(user=user)
    serializer = MyTweetSerializer(tweets, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_bookmark(request, pk):
    tweet = Tweet.objects.get(pk=pk)
    if request.user in tweet.bookmarked.all():
        tweet.bookmarked.remove(request.user)
    else:
        tweet.bookmarked.add(request.user)
    return Response({'status': 'ok'})

class TweetList(generics.ListCreateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def perform_create(self, serializer):
        image_url = self.request.data.get('image') 
        public_id = self.request.data.get('image_public_id')

        if image_url:
            serializer.save(user=self.request.user, image=image_url, image_public_id=public_id)
        else:
            serializer.save(user=self.request.user)

class TweetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]

    def perform_destroy(self, serializer):
        tweet = self.get_object()

        if tweet.image_public_id:
            cloudinary.uploader.destroy(tweet.image_public_id)

        tweet.delete()

