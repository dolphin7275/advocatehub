
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReviewViewSet, ReviewReplyViewSet, LawyerReviewsAPIView, LawyerDetailWithReviewsAPIView

router = DefaultRouter()
router.register(r'reviews', ReviewViewSet)
router.register(r'review-replies', ReviewReplyViewSet)  # ✅ NEW

urlpatterns = [
    
    path('api/lawyers/<int:lawyer_id>/reviews/', LawyerReviewsAPIView.as_view(), name='lawyer-reviews'),
    path('api/lawyers/<int:lawyer_id>/', LawyerDetailWithReviewsAPIView.as_view(), name='lawyer-detail-with-reviews'),
    path('api/', include(router.urls)), 
]
