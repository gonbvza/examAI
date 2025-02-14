from django.urls import path

from . import views

urlpatterns = [
    path("generateSummary/", views.summarize_text, name="summarize_textde")
]