
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WebsiteFeedbackViewSet, WebsiteFeedbackReplyViewSet

router = DefaultRouter()
router.register(r'website-feedback', WebsiteFeedbackViewSet)
router.register(r'website-feedback-replies', WebsiteFeedbackReplyViewSet, basename='website-feedback-reply')


urlpatterns = [
    path('', include(router.urls)),
]
