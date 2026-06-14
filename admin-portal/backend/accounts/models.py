from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db import models
import secrets

class AgentManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

class Agent(AbstractUser):
    username = None
    objects = AgentManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    email = models.EmailField(unique=True)
    groups = models.ManyToManyField(Group, blank=True, related_name="agent_set")
    user_permissions = models.ManyToManyField(Permission, blank=True, related_name="agent_set")

    profile_picture = models.ImageField(upload_to="agents/profiles/", null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    id_number = models.CharField(max_length=50, unique=True, null=True, blank=True)
    license_number = models.CharField(max_length=100, unique=True, null=True, blank=True)
    
    # Fixed: null=True, blank=True
    auth_code = models.CharField(max_length=8, unique=True, editable=False, null=True, blank=True)
    
    location_text = models.CharField(max_length=255, null=True, blank=True)
    location_metrics = models.JSONField(default=dict, blank=True)
    role = models.CharField(max_length=20, default="agent")

    def generate_auth_code(self):
        for _ in range(10):
            code = ''.join(secrets.choice("0123456789") for _ in range(8))
            if not Agent.objects.filter(auth_code=code).exists():
                return code
        raise ValueError("Could not generate unique auth code")

    def save(self, *args, **kwargs):
        if not self.auth_code:
            self.auth_code = self.generate_auth_code()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email