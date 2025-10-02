from django.urls import path

from .views import OrderCreateView, OrderVerifyView

urlpatterns = [
    path('init/', OrderCreateView.as_view(), name='payment-list'),
    path('verify/', OrderVerifyView.as_view(), name='payment-verify'),
]
