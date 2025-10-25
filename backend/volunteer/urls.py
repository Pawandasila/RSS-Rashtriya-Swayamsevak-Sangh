from django.urls import path
from .views import WingListCreateView, WingDetailView, LevelListCreateView, LevelDetailView, DesignationListCreateView, DesignationDetailView, VolunteerListCreateView, VolunteerDetailView

urlpatterns = [
    path('wings/', WingListCreateView.as_view(), name='wing-list-create'),
    path('wings/<int:pk>/', WingDetailView.as_view(), name='wing-detail'),

    path('levels/', LevelListCreateView.as_view(), name='level-list-create'),
    path('levels/<int:pk>/', LevelDetailView.as_view(), name='level-detail'),

    path('designations/', DesignationListCreateView.as_view(), name='designation-list-create'),
    path('designations/<int:pk>/', DesignationDetailView.as_view(), name='designation-detail'),

    path('volunteers/', VolunteerListCreateView.as_view(), name='volunteer-list-create'),
    path('volunteers/<int:pk>/', VolunteerDetailView.as_view(), name='volunteer-detail'),
]