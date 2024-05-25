from django.urls import path
from ..views import user_views as views


urlpatterns = [
    path("", views.getUsers, name="get Users"),
    path("login/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("profile/", views.getUserProfile, name="user_profile"),
    path("profile/update/", views.updateUserProfile, name="user_profile_update"),
    path("register/", views.registerUser, name="register"),
]
