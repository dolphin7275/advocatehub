# utils : 
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant
from django.conf import settings

def generate_twilio_token(identity, room_name):
    token = AccessToken(
        settings.TWILIO_ACCOUNT_SID,
        settings.TWILIO_API_KEY,
        settings.TWILIO_API_SECRET,
        identity=identity
    )
    token.add_grant(VideoGrant(room=room_name))
    return token.to_jwt()