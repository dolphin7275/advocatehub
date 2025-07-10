
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WebsiteFeedbackViewSet

router = DefaultRouter()
router.register(r'website-feedback', WebsiteFeedbackViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
