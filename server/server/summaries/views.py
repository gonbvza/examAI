import json
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from pypdf import PdfReader



@api_view(["POST"])
def summarize_text(request):
    # Debugging: Print request method and content type
    print("Request Method:", request.method)
    print("Request Content-Type:", request.content_type)
    print("Request FILES:", request.FILES)

    # Check if file is included in request
    if "file" not in request.FILES:
        return Response({"error": "No file uploaded. Make sure you're sending a 'file' field in form-data."}, status=400)

    uploaded_file = request.FILES["file"]  # Get the uploaded file

    # creating a pdf reader object
    reader = PdfReader(uploaded_file)

    page = reader.pages[0]

    text = page.extract_text()

    print(text)

    return Response({"summary"})

