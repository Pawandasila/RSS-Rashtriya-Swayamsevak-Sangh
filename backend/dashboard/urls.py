from django.urls import path
from .views import DashboardView, UserCountView

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
    path('user-count/', UserCountView.as_view(), name='user-count'),
]