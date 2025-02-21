from .models import Summaries
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from pypdf import PdfReader
from AI import gemini
import datetime

from django.contrib.sessions.models import Session
from django.contrib.auth.models import User

from django.views.decorators.csrf import csrf_exempt, requires_csrf_token

from rest_framework import generics


class SummarizeText(generics.GenericAPIView):

    @csrf_exempt
    def post(self, request):
        # Debugging: Print request method and content type
        print("Request Method:", request.method)
        print("Request Content-Type:", request.content_type)
        print("Request FILES:", request.FILES)

        
        print("sessionid: " + request.COOKIES['sessionid'])

        # Check if file is included in request
        if "file" not in request.FILES:
            return Response({"error": "No file uploaded. Make sure you're sending a 'file' field in form-data."}, status=400)

        print("SUMMARIZING TEXT")
        uploaded_file = request.FILES["file"]  # Get the uploaded file

        # creating a pdf reader object
        reader = PdfReader(uploaded_file)

        page = reader.pages[0]

        text = page.extract_text()

        summarizedText = gemini.makeSummary(text)

        summary = Summaries(
            name = "blockchain",
            summaryText = summarizedText,
            pub_date = datetime.date.today()
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
