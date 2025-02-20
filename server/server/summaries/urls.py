from django.urls import path

from . import views

urlpatterns = [
    path("generateSummary/", views.summarize_text, name="summarize_textde"),
    path("<int:id>", views.get_summary_by_id, name="Get a summary by ID")
]
