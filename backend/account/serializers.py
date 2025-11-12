from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserJoinSerializer(serializers.ModelSerializer):
    referred_by = serializers.SlugRelatedField(slug_field='user_id', queryset=User.objects.all(), required=False, allow_null=True)
    class Meta:
        model = User
        fields = ['email', 'password', 'name', 'phone', 'dob', 'user_id', 'username', 'referred_by']
        extra_kwargs = {'password': {'write_only': True}}

class UserMemberSerializer(serializers.ModelSerializer):
    referred_by = serializers.SlugRelatedField(slug_field='user_id', queryset=User.objects.all(), required=False, allow_null=True)
    class Meta:
        model = User
        fields = ['email', 'name', 'phone', 'dob', 'user_id', 'username', 'password', 'is_member_account', 'gender', 'profession', 'image', 'aadhar_number', 'pan_number', 'street', 'sub_district', 'district', 'city', 'state', 'country', 'postal_code', 'referred_by', 'blood_group']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.USERNAME_FIELD 

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if not username or not password:
            raise serializers.ValidationError("Username and password are required.")

        # Try to find user via multiple fields
        user = (
            User.objects.filter(email__iexact=username).first()
            or User.objects.filter(phone=username).first()
            or User.objects.filter(user_id=username).first()
            or User.objects.filter(username=username).first()
        )

        if user is None:
            raise serializers.ValidationError("User not found.")
        
        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect password.")
        
        data = super().get_token(user)
        refresh = str(data)
        access = str(data.access_token)

        return {
            "refresh": refresh,
            "access": access,
        }