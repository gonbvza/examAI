from django.db import models
import datetime

from django.utils import timezone

from django.contrib.auth.models import User
from django.db import models

from json import dumps

class Exams(models.Model):
    """
        Model used to store all of the exams, use the exam id as foreign key in questinos table
    """

    # Name of the exam
    name = models.CharField(max_length=100)
    
    # Publication date of the exam
    pub_date = models.DateTimeField("date published")

    # User id of the user   
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    def getRow(self):
        JSON = {
            "id": str(self.pk),
            "name": self.name,
            "pub_date": str(self.pub_date)
        }

        return(JSON)



class Questions(models.Model):
    """
        Model used to store the questinos of all the exams
    """

    # Question text
    text = models.TextField()

    # Answer A
    A = models.TextField()

    # Answer B
    B = models.TextField()

    # Answer C
    C = models.TextField()

    # Answer D
    D = models.TextField()

    # Correct answer
    correct = models.CharField(max_length=1)

    # Exam id of the exam the questions belongs
    exam_id = models.ForeignKey(Exams, on_delete=models.CASCADE)

    def getRow(self):
        JSON = {
            "questionText": str(self.text),
            "A": self.A,
            "B": self.B,
            "C": self.C,
            "D": self.D,
            "correct": self.correct,
        }

        return JSON