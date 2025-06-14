from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


# Create your views here.
class RegisterView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")

        if not username or not password:
            return Response(
                {"error": "Username and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if User.objects.filter(username=username).exists():
            return Response(
                {"error": """User already exists"""}, status=status.HTTP_400_BAD_REQUEST
            )
        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "User already exists"}, status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(
            username=username, password=password, email=email
        )

        login(request, user)

        return Response(
            {"message": "User created successfully"}, status=status.HTTP_201_CREATED
        )


class LoginView(generics.GenericAPIView):
    def post(self, request):
        if request.method == "POST":
            username = request.data.get("username")
            password = request.data.get("password")
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)  # Creates a session for the user
                return Response({"message": "Login successful"}, status=200)
            else:
                return Response({"error": "Invalid credentials"}, status=400)


class CheckSession(generics.GenericAPIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response({"authenticated": True, "username": request.user.username})
        return Response({"authenticated": False})


class LogoutSession(generics.GenericAPIView):

    def get(self, request):
        logout(request)
        return Response({"message": "Logged out"}, status=200)
