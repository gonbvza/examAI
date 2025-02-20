from django.db import models

# Create your models here.

class Users(models.Model):

    """
        Model used to store users information
    """

    # This is the username name
    name = models.CharField(max_length=100)

    # This is the surname
    surname = models.CharField(max_length=100)

    # This is the gmail of the user
    gmail = models.CharField(max_length=100)

    # This is to store the password
    password = models
