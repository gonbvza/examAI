# Generated by Django 5.1.6 on 2025-02-16 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('summaries', '0003_summaries_delete_question'),
    ]

    operations = [
        migrations.AlterField(
            model_name='summaries',
            name='summaryText',
            field=models.TextField(),
        ),
    ]
