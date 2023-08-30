from django.urls import path
from . import  views

urlpatterns = [
    path('canal/<str:username>/', views.chat),
    path('messages/<str:username>/', views.unread_message_count),
    path('unread_messages/', views.has_unread_messages),

]