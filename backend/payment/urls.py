from django.urls import path

from .views import OrderCreateView, OrderVerifyView, PaymentCreateView, PaymentDetailView, PaymentListView, PaymentStatView, UserPaymentListView

urlpatterns = [
    path('init/', OrderCreateView.as_view(), name='payment-list'),
    path('verify/', OrderVerifyView.as_view(), name='payment-verify'),
    path('stats/', PaymentStatView.as_view(), name='payment-stats'),
    path('create/', PaymentCreateView.as_view(), name='payment-create'),
    path('list/', PaymentListView.as_view(), name='payment-list'),
    path('detail/<int:id>/', PaymentDetailView.as_view(), name='payment-detail'),
    path('user-payments/', UserPaymentListView.as_view(), name='user-payment-list'),
]
