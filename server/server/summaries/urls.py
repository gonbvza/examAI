from django.urls import path

from . import views

urlpatterns = [
    path("generateSummary/", views.SummarizeText.as_view(), name="summarize_textde"),
    path("<int:id>", views.GetSummary.as_view(), name="Get a summary by ID")
]
