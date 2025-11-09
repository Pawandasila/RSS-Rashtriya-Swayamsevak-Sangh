from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from dashboard.permissions import IsAdminOrIsStaff
from dashboard.serializers import DistrictSerializer, StateSerializer

class StateCreateView(APIView):
    permission_classes = [IsAdminOrIsStaff]

    def post(self, request):
        data = request.data
        serializer = StateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DistrictCreateView(APIView):
    permission_classes = [IsAdminOrIsStaff]

    def post(self, request):
        data = request.data
        serializer = DistrictSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)