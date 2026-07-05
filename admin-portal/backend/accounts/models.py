from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
import secrets


# -------------------------
# MANAGER
# -------------------------
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
        # Explicitly enforce core admin flags so management commands do not complain
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "admin")

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


# -------------------------
# USER MODEL
# -------------------------
class Agent(AbstractUser):

    username = None  # Completely stripped to support direct email login authentication

    email = models.EmailField(unique=True)

    role = models.CharField(
        max_length=20,
        default="agent",
        choices=[
            ("admin", "Admin"),
            ("agent", "Agent"),
            ("inspector", "Inspector"),
            ("system", "System"),
        ]
    )

    profile_picture = models.ImageField(upload_to="agents/profiles/", null=True, blank=True)

    phone_number = models.CharField(max_length=20, null=True, blank=True)

    id_number = models.CharField(max_length=50, unique=True, null=True, blank=True)
    license_number = models.CharField(max_length=100, unique=True, null=True, blank=True)

    # Automatically generated 8-digit secure code for secondary agent validations
    auth_code = models.CharField(max_length=8, unique=True, editable=False, null=True, blank=True)

    location_text = models.CharField(max_length=255, null=True, blank=True)
    location_metrics = models.JSONField(default=dict, blank=True)

    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []  # No other fields are strictly forced during initial shell registration

    objects = AgentManager()

    def generate_auth_code(self):
        # Loop attempts to guarantee uniqueness inside your database records matrix
        for _ in range(10):
            code = ''.join(secrets.choice("0123456789") for _ in range(8))
            if not Agent.objects.filter(auth_code=code).exists():
                return code
        raise ValueError("Could not generate unique auth code")

    def save(self, *args, **kwargs):
        # Automatically run generation fallback block if field is unassigned
        if not self.auth_code:
            self.auth_code = self.generate_auth_code()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email