
from rest_framework import serializers
from .models import WebsiteFeedback
from advocateshub.models import User 

class UserSerializerForFeedback(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email'] 

class WebsiteFeedbackSerializer(serializers.ModelSerializer):
    user = UserSerializerForFeedback(read_only=True)
    class Meta:
        model = WebsiteFeedback
        fields = ['id', 'user', 'rating', 'feedback_text', 'created_at']
        read_only_fields = ['user', 'created_at'] 

    def create(self, validated_data):
        feedback = WebsiteFeedback.objects.create(**validated_data)
        return feedback
