from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator


class Blog(models.Model):
    user = models.ForeignKey('accounts.User', related_name="blogs", on_delete=models.CASCADE, verbose_name=_("User"))
    title = models.CharField(verbose_name=_("Title"), max_length=120)
    content = models.TextField(verbose_name=_("Content"))
    image = models.ImageField(upload_to='images/blog/', validators=[FileExtensionValidator(["jpeg"])])
    created_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name=_("Created Datetime"),
        help_text=_("This is the datetime when the object was created."),
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        editable=False,
        verbose_name=_("Updated Datetime"),
        help_text=_("This is the datetime when the object was last updated."),
    )

    def __str__(self):
        return f"Blog: {self.user} - {self.title} - {self.pk}"
