from rest_framework import serializers
from .models import User,ContactQuery
from clientapi.models import Client
from lawyerapi.models import Lawyer
from bookingapi.models import Booking
from chat.models import ChatMessage
from videosession.models import VideoSession


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
    languages = serializers.CharField(required=False)
    

    # Client-specific fields
    language = serializers.CharField(required=False)
    dob = serializers.DateField(required=False)

    class Meta:
        model = User
        fields = [
            'username', 'name', 'email', 'phone', 'profile', 'password', 'confirm_password', 'role',
            'cnic', 'education', 'degree', 'aadhar', 'pan', 'bar', 'location', 'court_level',
            'case_types', 'experience', 'availability', 'price', 'available_slots',
            'language', 'dob','languages',
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
                    languages=validated_data.get('languages'),
                )

            return user

        except Exception as e:
            import traceback
            traceback.print_exc()
            raise serializers.ValidationError({"server_error": str(e)})



# ✅ Nested User Serializer
class UserNestedSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    class Meta:
        model = User
        fields = ['id', 'name', 'email','phone', 'profile', 'date_joined',]

# ✅ Client Serializer
class ClientSerializer(serializers.ModelSerializer):
    user = UserNestedSerializer()  # Nested user info

    class Meta:
        model = Client
        fields = ['id', 'user', 'dob','language']

# ✅ Lawyer Serializer
class LawyerSerializer(serializers.ModelSerializer):
    user = UserNestedSerializer()  # replaces user_profile

    class Meta:
        model = Lawyer
        fields = [
            'id', 'user', 'cnic', 'education', 'degree', 'aadhar', 'pan', 'bar',
            'location', 'court_level', 'case_types', 'experience',
            'availability', 'price', 'profile_status', 'available_slots', 'languages',
            'average_rating', 'review_count'
        ]

# _____________________________________________________________________________
class BookingSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)  # ✅ full nested client info
    client_name = serializers.CharField(source='client.user.name', read_only=True)
    class Meta:
        model = Booking
        fields = '__all__'

# ______________________________________________________________________________________
class ChatMessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.name', read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['id', 'booking', 'sender', 'sender_name', 'message', 'timestamp']


# _________________________________________________________________________________________________________


class VideoSessionSerializer(serializers.ModelSerializer):
    participants = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        many=True
    )

    class Meta:
        model = VideoSession
        fields = ['id', 'booking', 'participants', 'started_at', 'ended_at', 'is_active']

    def create(self, validated_data):
        participants = validated_data.pop('participants')
        video_session = VideoSession.objects.create(**validated_data)
        video_session.participants.set(participants)
        return video_session
    
class ContactQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model=ContactQuery
        fields=['id','name','email','contact','subject','message']