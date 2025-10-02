from django.urls import path

from .views import PaymentView

urlpatterns = [
    path('init/', PaymentView.as_view(), name='payment-list'),
]
