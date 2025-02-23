from .models import Questions, Exams
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from pypdf import PdfReader
from AI import gemini

from .serializer import produceExam

import datetime
from django.core import serializers
from django.contrib.sessions.models import Session
from django.contrib.auth.models import User

from django.views.decorators.csrf import csrf_exempt, requires_csrf_token

import json

from rest_framework import generics

class QuestionsFile(generics.GenericAPIView):

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

        exam = gemini.generateExam(text)

        examJSON = json.loads(exam)

        rowExam = Exams(
            name = file_name,
            pub_date = datetime.date.today(),
            user_id = current_user
        )

        rowExam.save()

        for question in examJSON['questions']:
            questionRow = Questions(
                text = question['questionText'],
                A = question['answerA'],
                B = question['answerB'],
                C = question['answerC'],
                D = question['answerD'],
                correct = question['Correct'],
                exam_id = rowExam
            )

            questionRow.save()

        return JsonResponse({"summaryID": rowExam.id})

class QuestionsText(generics.GenericAPIView):

    def post(self, request):
        # Debugging: Print request method and content type
        current_user = request.user

        print("SUMMARIZING TEXT")

        content = request.data
        text = content['text']
        file_name = content['name']

        exam = gemini.generateExam(text)

        examJSON = json.loads(exam)

        rowExam = Exams(
            name = file_name,
            pub_date = datetime.date.today(),
            user_id = current_user
        )

        rowExam.save()

        for question in examJSON['questions']:
            questionRow = Questions(
                text = question['questionText'],
                A = question['answerA'],
                B = question['answerB'],
                C = question['answerC'],
                D = question['answerD'],
                correct = question['Correct'],
                exam_id = rowExam
            )

            questionRow.save()

        return JsonResponse({"summaryID": rowExam.id})

class GetExam(generics.GenericAPIView):
    def get(self, request, id):
        print("getting questinos")
        examRow = Exams.objects.get(pk=id)

        questions = Questions.objects.filter(exam_id=examRow)

        data = []
        for question in questions:
            data.append(question.getRow())

        examJSON = produceExam(examRow, data)
        return JsonResponse(examJSON)