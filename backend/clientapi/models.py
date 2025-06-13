from django.db import models
from advocateshub.models import User


class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    language = models.CharField(max_length=50)
    dob = models.DateField()

    def __str__(self):
        return f"Client: {self.user.username}"
