from rest_framework import serializers
from .models import User
from clientapi.models import Client
from lawyerapi.models import Lawyer
from bookingapi.models import Booking

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    profile = serializers.FileField(required=False)

    # Lawyer-specific fields
    cnic = serializers.CharField(required=False)
    education = serializers.CharField(required=False)
    degree = serializers.FileField(required=False)
    aadhar = serializers.FileField(required=False)
    pan = serializers.FileField(required=False)
    bar = serializers.FileField(required=False)
    location = serializers.CharField(required=False)
    court_level = serializers.CharField(required=False)
    case_types = serializers.CharField(required=False)
    experience = serializers.CharField(required=False)
    availability = serializers.CharField(required=False)
    price = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    available_slots = serializers.JSONField(required=False)

    # Client-specific fields
    language = serializers.CharField(required=False)
    dob = serializers.DateField(required=False)

    class Meta:
        model = User
        fields = [
            'username', 'name', 'email', 'phone', 'profile', 'password', 'confirm_password', 'role',
            'cnic', 'education', 'degree', 'aadhar', 'pan', 'bar', 'location', 'court_level',
            'case_types', 'experience', 'availability', 'price', 'available_slots',
            'language', 'dob'
        ]

    def validate(self, data):
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        try:
            user_fields = ['username', 'name', 'email', 'phone']
            user_data = {field: validated_data.pop(field) for field in user_fields if field in validated_data}

            password = validated_data.pop('password')
            validated_data.pop('confirm_password', None)
            role = validated_data.pop('role')
            profile = validated_data.pop('profile', None)

            user = User(**user_data, role=role)
            if profile:
                user.profile = profile
            user.set_password(password)
            user.save()

            if role == 'client':
                Client.objects.create(
                    user=user,
                    language=validated_data.get('language'),
                    dob=validated_data.get('dob'),
                )
            elif role == 'lawyer':
                Lawyer.objects.create(
                    user=user,
                    cnic=validated_data.get('cnic'),
                    education=validated_data.get('education'),
                    degree=validated_data.get('degree'),
                    aadhar=validated_data.get('aadhar'),
                    pan=validated_data.get('pan'),
                    bar=validated_data.get('bar'),
                    location=validated_data.get('location'),
                    court_level=validated_data.get('court_level'),
                    case_types=validated_data.get('case_types'),
                    experience=validated_data.get('experience'),
                    availability=validated_data.get('availability'),
                    price=validated_data.get('price'),
                    available_slots=validated_data.get('available_slots', {}),
                )

            return user

        except Exception as e:
            import traceback
            traceback.print_exc()
            raise serializers.ValidationError({"server_error": str(e)})


# _______________________________________________________________________________________________________
class LawyerSerializer(serializers.ModelSerializer):
    user_profile = serializers.SerializerMethodField()
    class Meta:
        model = Lawyer
        fields = [
            'id', 'user', 'cnic', 'education', 'degree', 'aadhar', 'pan', 'bar','user_profile',
            'location', 'court_level', 'case_types', 'experience',
            'availability', 'price', 'profile_status', 'available_slots'
        ]
    def get_user_profile(self, obj):
        request = self.context.get('request')
        if obj.user.profile:
            return request.build_absolute_uri(obj.user.profile.url)
        return None

# _____________________________________________________________________________
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

        