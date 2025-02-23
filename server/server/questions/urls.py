from django.urls import path

from . import views

urlpatterns = [
    path("generateQuestions/file", views.QuestionsFile.as_view(), name="Produce exam"),
    path("generateQuestions/text", views.QuestionsText.as_view(), name="Produce exam"),
    path("<int:id>", views.GetExam.as_view(), name="Get exam by id")
]