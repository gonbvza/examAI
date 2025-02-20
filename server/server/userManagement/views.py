from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
# Create your views here.

@api_view(["POST"])
def loginUser(request):
    print("Login")

    return JsonResponse({"sum": 12})