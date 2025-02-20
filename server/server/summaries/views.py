from .models import Summaries
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from pypdf import PdfReader
from AI import gemini
import datetime

@api_view(["POST"])
def summarize_text(request):
    # Debugging: Print request method and content type
    print("Request Method:", request.method)
    print("Request Content-Type:", request.content_type)
    print("Request FILES:", request.FILES)

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

@api_view(["GET"])
def get_summary_by_id(request, id):
    
    print("Getting summary")

    summary = Summaries.objects.get(pk = id)

    text = summary.summaryText.splitlines()

    responseData = {
        "name": summary.name,
        "summary": text[1:]
    }

    return JsonResponse(responseData)
