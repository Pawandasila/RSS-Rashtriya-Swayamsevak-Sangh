from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from django.db.models import Q 
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

from dashboard.permissions import IsAdminOrIsStaff
from .models import Volunteer, Wing, Level, Designation
from .serializers import VolunteerSerializer, WingSerializer, LevelSerializer, DesignationSerializer
from .filters import VolunteerFilter, LevelFilter, DesignationFilter

class WingListCreateView(ListCreateAPIView):
    queryset = Wing.objects.all()
    serializer_class = WingSerializer
    search_fields = ['name', 'description']

    def get_permissions(self):
        if self.request.method in ['POST']:
            return [IsAdminOrIsStaff()]
        return [AllowAny()]
    
class WingDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Wing.objects.all()
    serializer_class = WingSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAdminOrIsStaff()]
        return [AllowAny()]
    
class LevelListCreateView(ListCreateAPIView):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = LevelFilter
    search_fields = ['name']

    def get_permissions(self):
        if self.request.method in ['POST']:
            return [IsAdminOrIsStaff()]
        return [AllowAny()]
    
class LevelDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAdminOrIsStaff()]
        return [AllowAny()]

class DesignationListCreateView(ListCreateAPIView):
    queryset = Designation.objects.all()
    serializer_class = DesignationSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['title']
    filterset_class = DesignationFilter

    def get_permissions(self):
        if self.request.method in ['POST']:
            return [IsAdminOrIsStaff()]
        return [AllowAny()]
    
class DesignationDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Designation.objects.all()
    serializer_class = DesignationSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAdminOrIsStaff()]
        return [AllowAny()]

class VolunteerListCreateView(ListCreateAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['wing', 'level', 'designation']
    search_fields = ['user__first_name', 'user__last_name', 'phone_number']

    def get_permissions(self):
        if self.request.method in ['POST']:
            return [IsAdminOrIsStaff()]
        return [AllowAny()]
    
class VolunteerDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAdminOrIsStaff()]
        return [AllowAny()]