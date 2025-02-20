from django.db import models
import datetime

from django.utils import timezone
# Create your models here.
class Summaries(models.Model):
    
    name = models.CharField(max_length=100)
    summaryText = models.TextField()
    pub_date = models.DateTimeField("date published")
    # TODO: Create the users table and define the ID as foreign key

    def __str__(self):
        return self.question_text
    
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)
