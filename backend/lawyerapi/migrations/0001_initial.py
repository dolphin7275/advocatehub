# Generated by Django 5.2.1 on 2025-06-11 04:34

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Lawyer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cnic', models.CharField(max_length=20)),
                ('education', models.CharField(max_length=100)),
                ('degree', models.FileField(blank=True, null=True, upload_to='kyc/degree/')),
                ('aadhar', models.FileField(blank=True, null=True, upload_to='kyc/aadhar/')),
                ('pan', models.FileField(blank=True, null=True, upload_to='kyc/pan/')),
                ('bar', models.FileField(blank=True, null=True, upload_to='kyc/bar/')),
                ('location', models.CharField(max_length=100)),
                ('court_level', models.CharField(max_length=50)),
                ('case_types', models.CharField(max_length=200)),
                ('experience', models.CharField(max_length=50)),
                ('availability', models.CharField(max_length=200)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('profile_status', models.CharField(default='pending', max_length=20)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
