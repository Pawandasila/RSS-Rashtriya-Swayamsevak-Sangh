from django.urls import path
from .views import DashboardView, UserCountView, ReferralListView, UserReferralListView

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
    path('user-count/', UserCountView.as_view(), name='user-count'),
    path('referrals/', ReferralListView.as_view(), name='referral-list'),
    path('referrals/<str:user_id>/', UserReferralListView.as_view(), name='user-referral-list'),
]