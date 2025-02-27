from .models import Summaries
from questions.models import Exams

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

from django.core.exceptions import BadRequest

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
        try:
            user_id = request.COOKIES

            print("user")
            print(user_id)

            summary = Summaries.objects.get(pk = id)

            text = summary.summaryText.splitlines()

            responseData = {
                "name": summary.name,
                "summary": text[1:]
            }

            return JsonResponse(responseData)
        except (BadRequest):
            return Response({"error": "Summary not found"}, status=400)
        
        except Exception as e:
            return Response({"error": e}, status=400)

class GetAllExams(generics.GenericAPIView):
    def get(self, request):
        if request.user.is_authenticated:
            currentUser = request.user

            summaries = Summaries.objects.filter(user_id = currentUser)
            questionExams = Exams.objects.filter(user_id = currentUser)

            data = []
            for i in summaries:
                data.append(i.getRow())

            
            for i in questionExams:
                data.append(i.getRow())

            data.sort(key=lambda x: x['pub_date'], reverse=True)

            response = {
                "rows": data,
            }

            return Response(response)

        print("Not authenitcated")
        return Response("Not authenticated")