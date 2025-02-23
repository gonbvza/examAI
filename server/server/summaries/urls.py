from django.urls import path

from . import views

urlpatterns = [
    path("generateSummary/file", views.SummarizeTextFile.as_view(), name="summarize_textde"),
    path("generateSummary/text", views.SummarizeText.as_view(), name="summarize_textde"),
    path("<int:id>", views.GetSummary.as_view(), name="Get a summary by ID"),
    path("", views.GetAllExams.as_view(), name="Get all summaries"), 
]