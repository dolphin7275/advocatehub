
from rest_framework import serializers
from .models import Review, ReviewReply
from lawyerapi.models import Lawyer 
from advocateshub.models import User 
from clientapi.models import Client 
from advocateshub.serializers import UserNestedSerializer,LawyerSerializer

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email']

# class LawyerSerializerForReviews(serializers.ModelSerializer):
#     user = UserNestedSerializer(read_only=True) 
#     class Meta:
#         model = Lawyer
#         fields = [
#             'user', 'location', 'court_level', 'case_types', 'experience', 
#             'price', 'languages', 'average_rating', 'review_count'
#         ] # Include relevant lawyer fields and aggregated review fields

class ReviewReplySerializer(serializers.ModelSerializer):
    lawyer_name = serializers.CharField(source='lawyer.user.username', read_only=True)

    class Meta:
        model = ReviewReply
        fields = ['id', 'lawyer_name', 'reply_text', 'created_at']
        read_only_fields = ['id', 'lawyer_name', 'created_at']
    


class ReviewSerializer(serializers.ModelSerializer):
    user = UserNestedSerializer(read_only=True) 
    lawyer = LawyerSerializer(read_only=True) # Display lawyer details
    reply = ReviewReplySerializer(read_only=True)
    class Meta:
        model = Review
        fields = ['id', 'user', 'lawyer', 'rating', 'feedback', 'created_at', 'reply']
        read_only_fields = ['user', 'lawyer', 'created_at', 'reply'] # User and lawyer are set by view, not directly by client in POST

    def create(self, validated_data):
        user_for_validation = self.context['request'].user 
        try:
            client_profile = Client.objects.get(user=user_for_validation)
        except Client.DoesNotExist:
            raise serializers.ValidationError({"detail": "Only registered clients can submit reviews."})

        # Get lawyer_id from initial_data (raw request data)
        lawyer_id = self.context['request'].data.get('lawyer_id')
        if not lawyer_id:
            raise serializers.ValidationError({"lawyer_id": "This field is required."})
        
        try:
            lawyer_instance = Lawyer.objects.get(id=lawyer_id) 
        except Lawyer.DoesNotExist:
            raise serializers.ValidationError({"lawyer_id": "Lawyer profile not found."})

        # Check for existing review by this user for this lawyer
        if Review.objects.filter(user=user_for_validation, lawyer=lawyer_instance).exists():
            raise serializers.ValidationError("You have already submitted a review for this lawyer.")
        review = Review.objects.create(lawyer=lawyer_instance,user=user_for_validation,**validated_data)
        # review = Review.objects.create(lawyer=lawyer_instance, **validated_data) 
        return review

    def update(self, instance, validated_data):
        # Ensure user and lawyer cannot be changed after creation
        if 'user' in validated_data:
            raise serializers.ValidationError({"user": "User cannot be changed."})
        if 'lawyer' in validated_data:
            raise serializers.ValidationError({"lawyer": "Lawyer cannot be changed."})

        instance.rating = validated_data.get('rating', instance.rating)
        instance.feedback = validated_data.get('feedback', instance.feedback)
        instance.save()
        return instance
