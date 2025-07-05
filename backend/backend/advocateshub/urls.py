from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import RegisterView, UserDetailAPI,PendingLawyersAPI,ApproveLawyerAPI,RejectLawyerAPI,AllLawyersAPI,UpdateLawyerSlotsAPI,ApprovedLawyerListAPI

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', UserDetailAPI.as_view(), name='user_detail'),
    path('update-lawyer-slots/', UpdateLawyerSlotsAPI.as_view()),
    path('approved-lawyers/', ApprovedLawyerListAPI.as_view()),



    # ✅ Admin routes
    path('pending-lawyers/', PendingLawyersAPI.as_view()),
    path('approve-lawyer/<int:lawyer_id>/', ApproveLawyerAPI.as_view()),
    path('reject-lawyer/<int:lawyer_id>/', RejectLawyerAPI.as_view()),
    path('all-lawyers/', AllLawyersAPI.as_view()),  # ✅ Add this line
]