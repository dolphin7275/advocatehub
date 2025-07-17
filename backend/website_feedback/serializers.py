
from rest_framework import serializers
from .models import WebsiteFeedback, WebsiteFeedbackReply
from advocateshub.models import User 

class UserSerializerForFeedback(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email'] 



class WebsiteFeedbackReplySerializer(serializers.ModelSerializer):
    responder_name = serializers.CharField(source='responder.username', read_only=True)

    class Meta:
        model = WebsiteFeedbackReply
        fields = ['id', 'responder_name', 'reply_text', 'created_at']
        read_only_fields = ['id', 'responder_name', 'created_at']
        
class WebsiteFeedbackSerializer(serializers.ModelSerializer):
    user = UserSerializerForFeedback(read_only=True)
    reply = WebsiteFeedbackReplySerializer(read_only=True)

    class Meta:
        model = WebsiteFeedback
        fields = ['id', 'user', 'rating', 'feedback_text', 'created_at','reply']
        read_only_fields = ['user', 'created_at', 'reply'] 

    def create(self, validated_data):
        feedback = WebsiteFeedback.objects.create(**validated_data)
        return feedback