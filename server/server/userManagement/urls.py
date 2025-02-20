from django.urls import path

from . import views


urlpatterns = [
    path("signup/", views.RegisterView.as_view(), name="signUp"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("check-session/", views.CheckSession.as_view(), name="Check session"),
    path("logout/", views.LogoutSession().as_view(), name="logout")
]
