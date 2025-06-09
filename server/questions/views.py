import json
from datetime import datetime

from AI import gemini
from django.http import JsonResponse
from pypdf import PdfReader
from rest_framework import generics
from rest_framework.response import Response

from .models import Exams, Questions
from .serializer import produceExam


class QuestionsFile(generics.GenericAPIView):

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

        page = reader.pages[0]

        text = page.extract_text()

        exam = gemini.generateExam(text)

        examJSON = json.loads(exam)

        rowExam = Exams(name=file_name, pub_date=datetime.now(), user_id=current_user)

        rowExam.save()

        for question in examJSON["questions"]:
            questionRow = Questions(
                text=question["questionText"],
                A=question["answerA"],
                B=question["answerB"],
                C=question["answerC"],
                D=question["answerD"],
                correct=question["Correct"],
                exam_id=rowExam,
            )

            questionRow.save()

        return JsonResponse({"summaryID": rowExam.id})


class QuestionsText(generics.GenericAPIView):

    def post(self, request):
        current_user = request.user

        content = request.data
        text = content["text"]
        file_name = content["name"]

        exam = gemini.generateExam(text)

        examJSON = json.loads(exam)

        rowExam = Exams(name=file_name, pub_date=datetime.now(), user_id=current_user)

        rowExam.save()

        for question in examJSON["questions"]:
            questionRow = Questions(
                text=question["questionText"],
                A=question["answerA"],
                B=question["answerB"],
                C=question["answerC"],
                D=question["answerD"],
                correct=question["Correct"],
                exam_id=rowExam,
            )

            questionRow.save()

        return JsonResponse({"summaryID": rowExam.id})


class GetExam(generics.GenericAPIView):
    def get(self, request, id):

        examRow = Exams.objects.get(pk=id)

        questions = Questions.objects.filter(exam_id=examRow)

        current_user = request.user

        if current_user != examRow.user_id:
            return Response({"error": "You cant access that page"}, status=404)

        data = []

        for question in questions:
            data.append(question.getRow())

        examJSON = produceExam(examRow, data)

        return JsonResponse(examJSON)
