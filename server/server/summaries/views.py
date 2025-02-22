from .models import Summaries
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from pypdf import PdfReader
from AI import gemini
import datetime
from django.core import serializers
from django.contrib.sessions.models import Session
from django.contrib.auth.models import User

from django.views.decorators.csrf import csrf_exempt, requires_csrf_token

import json

from rest_framework import generics


class SummarizeTextFile(generics.GenericAPIView):

    def post(self, request):
        # Debugging: Print request method and content type
        print("Request Method:", request.method)
        print("Request Content-Type:", request.content_type)
        print("Request FILES:", request.FILES)

        current_user = request.user

        # Check if file is included in request
        if "file" not in request.FILES:
            return Response({"error": "No file uploaded. Make sure you're sending a 'file' field in form-data."}, status=400)

        print("SUMMARIZING FLE")
        uploaded_file = request.FILES["file"]  # Get the uploaded file
        file_name = uploaded_file.name
        
        # creating a pdf reader object
        reader = PdfReader(uploaded_file)

        page = reader.pages[0]

        text = page.extract_text()

        summarizedText = gemini.makeSummary(text)

        summary = Summaries(
            name = file_name,
            summaryText = summarizedText,
            pub_date = datetime.date.today(),
            user_id = current_user
        )

        summary.save()

        return JsonResponse({"summaryID": summary.id})

class SummarizeText(generics.GenericAPIView):

    def post(self, request):
        # Debugging: Print request method and content type
        current_user = request.user

        print("SUMMARIZING TEXT")

        content = request.data
        text = content['text']
        name = content['name']

        summarizedText = gemini.makeSummary(text)

        summary = Summaries(
            name = name,
            summaryText = summarizedText,
            pub_date = datetime.date.today(),
            user_id = current_user
        )

        summary.save()

        return JsonResponse({"summaryID": summary.id})

class GetSummary(generics.GenericAPIView):
    def get(self, request, id):
        
        print("Getting summary")

        summary = Summaries.objects.get(pk = id)

        text = summary.summaryText.splitlines()

        responseData = {
            "name": summary.name,
            "summary": text[1:]
        }

        return JsonResponse(responseData)

class GetAllSummaries(generics.GenericAPIView):
    def get(self, request):
        if request.user.is_authenticated:
            currentUser = request.user

            summaries = Summaries.objects.filter(user_id = currentUser)

            data = []
            for i in summaries:
                data.append(i.getRow())

            response = {
                "summaries": data,
                "questions": []
            }

            return Response(response)

        print("Not authenitcated")
        return Response("Not authenticated")