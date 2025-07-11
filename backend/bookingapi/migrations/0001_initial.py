# Generated by Django 5.2.4 on 2025-07-10 21:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('clientapi', '0001_initial'),
        ('lawyerapi', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scheduled_for', models.DateTimeField()),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('rejected', 'Rejected')], max_length=20)),
                ('seen_by_client', models.BooleanField(default=False)),
                ('seen_by_lawyer', models.BooleanField(default=False)),
                ('mode', models.CharField(blank=True, max_length=20, null=True)),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('duration', models.IntegerField(blank=True, null=True)),
                ('reschedule_reason', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clientapi.client')),
                ('lawyer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lawyerapi.lawyer')),
            ],
        ),
    ]
