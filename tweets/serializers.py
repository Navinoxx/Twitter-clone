from rest_framework import serializers
from . models import Tweet, Comment
from backend.pagination import CustomPagination


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.name')
    username = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.avatar')

    class Meta:
        model = Comment
        fields = '__all__'

    def get_avatar(self, obj):
        return obj.user.avatar

class MyTweetSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField(read_only=True)
    retweets_count = serializers.SerializerMethodField(read_only=True)
    user = serializers.ReadOnlyField(source='user.name')
    username = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.avatar')

    class Meta:
        model = Tweet
        fields = ['id', 'user', 'username',
                  'avatar', 
                  'content', 
                  'image', 'image_public_id', 'liked', 
                  'retweeted', 'created_at', 
                  'likes_count', 'retweets_count','parent']

    def get_avatar(self, obj):
        return obj.user.avatar

    def get_likes_count(self, obj):
        return obj.liked.all().count()

    def get_retweets_count(self, obj):
        return obj.retweeted.all().count()

class TweetSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.name')
    username = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.avatar')
    likes_count = serializers.SerializerMethodField(read_only=True)
    retweets_count = serializers.SerializerMethodField(read_only=True)
    iliked = serializers.SerializerMethodField(read_only=True)
    iretweeted = serializers.SerializerMethodField(read_only=True)
    bookmarked = serializers.SerializerMethodField(read_only=True)
    image = serializers.SerializerMethodField(read_only=True)
    image_public_id = serializers.SerializerMethodField(read_only=True)

    pagination = CustomPagination()

    class Meta:
        model = Tweet
        fields = ['id', 'user', 'username',
                  'avatar',
                  'content', 
                  'image', 'image_public_id', 'liked', 'retweeted', 'created_at', 'likes_count', 'retweets_count', 'iliked', 'iretweeted', 'bookmarked', 'parent']
    
    def get_image(self, obj):
        return obj.image
    
    def get_image_public_id(self, obj):
        return obj.image_public_id
    
    def get_avatar(self, obj):
        return obj.user.avatar

    def get_likes_count(self, obj):
        return obj.liked.all().count()

    def get_retweets_count(self, obj):
        return obj.retweeted.all().count()

    def get_iliked(self, obj):
        return True if self.context['request'].user in obj.liked.all() else False

    def get_iretweeted(self, obj):
        return True if self.context['request'].user in obj.retweeted.all() else False
    
    def get_bookmarked(self, obj):
        return True if self.context['request'].user in obj.bookmarked.all() else False

