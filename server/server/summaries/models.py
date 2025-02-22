from django.db import models
import datetime

from django.utils import timezone

from django.contrib.auth.models import User
from django.db import models

from json import dumps

# Create your models here.
class Summaries(models.Model):
    
    name = models.CharField(max_length=100)
    summaryText = models.TextField()
    pub_date = models.DateTimeField("date published")
    # TODO: Create the users table and define the ID as foreign key

    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return(f"id: {str(self.pk)}, name: {self.name}, pub_date: {str(self.pub_date)}")
    
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)
    
    def getRow(self):
        JSON = {
            "id": str(self.pk),
            "name": self.name,
            "pub_date": str(self.pub_date)
        }

        return(JSON)
