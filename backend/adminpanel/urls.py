from django.urls import path
from .views import DistrictCreateView, StateCreateView

urlpatterns = [
    path('districts/create/', DistrictCreateView.as_view(), name='district-create'),
    path('states/create/', StateCreateView.as_view(), name='state-create'),
]