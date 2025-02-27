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
        current_user = request.user

        if "file" not in request.FILES:
            return Response({"error": "No file uploaded. Make sure you're sending a 'file' field in form-data."}, status=400)

        uploaded_file = request.FILES["file"] 
        
        file_name = uploaded_file.name

        reader = PdfReader(uploaded_file)
        text = ""

        for i in range(len(reader.pages)):
            print("page " + str(i))
            page = reader.pages[i]
            text += page.extract_text()

        page = reader.pages[0]

        text = page.extract_text()

        print("The text is")
        print(text)

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

        examRow = Exams.objects.get(pk=id)

        questions = Questions.objects.filter(exam_id=examRow)

        current_user = request.user

        current_user_id = current_user.id
        
        if current_user != examRow.user_id:
            return Response({"error": "You cant access that page"}, status=404)

        data = []
        for question in questions:
            data.append(question.getRow())

        examJSON = produceExam(examRow, data)
        return JsonResponse(examJSON)