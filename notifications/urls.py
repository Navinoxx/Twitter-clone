from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_read_notifications),
    path('no/', views.get_unread_notifications),
    path('leer/<int:notification_id>/', views.mark_notifications_as_read),
]