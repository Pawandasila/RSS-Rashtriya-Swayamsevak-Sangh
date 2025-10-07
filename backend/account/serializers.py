from rest_framework import serializers
from .models import User

class UserJoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'name', 'phone', 'dob', 'user_id', 'username']
        extra_kwargs = {'password': {'write_only': True}}

class UserMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'phone', 'dob', 'user_id', 'username', 'password', 'is_member_account', 'gender', 'profession', 'image', 'aadhar_number', 'pan_number', 'street', 'sub_district', 'district', 'city', 'state', 'country', 'postal_code', 'referred_by']