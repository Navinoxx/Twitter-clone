from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('follow/<str:username>/', views.toggle_follow),
    path('u/search/', views.search_users),
    path('recommendations/', views.get_recommendations),
    path('register/', views.user_register),
    path('login/', views.MyTokenObtainPairSerializer.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('<str:username>/', views.UserDetailView.as_view()),
    path('<str:username>/delete/', views.user_delete),
]