from django.urls import path
from .views import DashboardView, UserCountView, ReferralListView, PaymentListView

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
    path('user-count/', UserCountView.as_view(), name='user-count'),
    path('referrals/', ReferralListView.as_view(), name='referral-list'),
    path('payments/', PaymentListView.as_view(), name='payment-list'),
]