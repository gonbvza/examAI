from datetime import datetime

from AI import gemini
from django.core.exceptions import BadRequest
from django.http import JsonResponse
from pypdf import PdfReader
from questions.models import Exams
from rest_framework import generics
from rest_framework.response import Response

from .models import Summaries


class SummarizeTextFile(generics.GenericAPIView):

    def post(self, request):
        current_user = request.user

        if "file" not in request.FILES:
            return Response(
                {
                    "error": "No file uploaded. Make sure you're sending a 'file' field in form-data."
                },
                status=400,
            )

        uploaded_file = request.FILES["file"]
        file_name = uploaded_file.name

        reader = PdfReader(uploaded_file)
        text = ""

        for i in range(len(reader.pages)):
            page = reader.pages[i]
            text += page.extract_text()

        summarizedText = gemini.makeSummary(text)

        summary = Summaries(
            name=file_name,
            summaryText=summarizedText,
            pub_date=datetime.now(),
            user_id=current_user,
        )

        summary.save()

        return JsonResponse({"summaryID": summary.id})


class SummarizeText(generics.GenericAPIView):

    def post(self, request):

        current_user = request.user

        content = request.data
        text = content["text"]
        name = content["name"]

        summarizedText = gemini.makeSummary(text)

        if summarizedText.split("\n")[0] == "Not Enough":
            return Response({"error": "Please provide more text"}, status=405)

        summary = Summaries(
            name=name,
            summaryText=summarizedText,
            pub_date=datetime.now(),
            user_id=current_user,
        )

        summary.save()

        return JsonResponse({"summaryID": summary.id})


class GetSummary(generics.GenericAPIView):
    def get(self, request, id):
        try:

            current_user = request.user

            summary = Summaries.objects.get(pk=id)

            if current_user != summary.user_id:
                return Response({"error": "You cant access that page"}, status=404)

            text = summary.summaryText.splitlines()

            responseData = {"name": summary.name, "summary": text[1:]}

            return JsonResponse(responseData)
        except BadRequest:
            return Response({"error": "Summary not found"}, status=400)

        except Exception as e:
            return Response({"error": e}, status=400)


class GetAllExams(generics.GenericAPIView):
    def get(self, request):
        if request.user.is_authenticated:
            currentUser = request.user

            summaries = Summaries.objects.filter(user_id=currentUser)
            questionExams = Exams.objects.filter(user_id=currentUser)

            data = []
            for i in summaries:
                data.append(i.getRow())

            for i in questionExams:
                data.append(i.getRow())

            data.sort(key=lambda x: x["pub_date"], reverse=True)

            response = {
                "rows": data,
            }

            return Response(response)

        return Response("Not authenticated")
