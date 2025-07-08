import os
import sys
import django
from datetime import date, timedelta

# Add the project root to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.core.management.base import BaseCommand
from appointment.models import Appointment


class Command(BaseCommand):
    help = 'Create test appointments for demonstration'

    def handle(self, *args, **options):
        # Clear existing test appointments
        Appointment.objects.all().delete()
        
        # Create test appointments
        test_appointments = [
            {
                'name': 'John Smith',
                'email': 'john.smith@email.com',
                'phone': '+91-9876543210',
                'date': date.today() + timedelta(days=1),
                'time': '10:00 AM',
                'message': 'Regular eye checkup appointment',
                'status': 'pending'
            },
            {
                'name': 'Sarah Johnson',
                'email': 'sarah.j@email.com',
                'phone': '+91-9876543211',
                'date': date.today() + timedelta(days=2),
                'time': '2:30 PM',
                'message': 'Follow-up consultation for previous treatment',
                'status': 'confirmed'
            },
            {
                'name': 'Michael Davis',
                'email': 'michael.d@email.com',
                'phone': '+91-9876543212',
                'date': date.today() + timedelta(days=3),
                'time': '11:15 AM',
                'message': 'Initial consultation for eyelid surgery',
                'status': 'pending'
            },
            {
                'name': 'Emily Wilson',
                'email': 'emily.w@email.com',
                'phone': '+91-9876543213',
                'date': date.today() - timedelta(days=1),
                'time': '9:30 AM',
                'message': 'Post-surgery follow-up',
                'status': 'completed'
            },
            {
                'name': 'Robert Brown',
                'email': 'robert.b@email.com',
                'phone': '+91-9876543214',
                'date': date.today() + timedelta(days=5),
                'time': '4:00 PM',
                'message': 'Aesthetic consultation',
                'status': 'cancelled'
            },
            {
                'name': 'Lisa Martinez',
                'email': 'lisa.m@email.com',
                'phone': '+91-9876543215',
                'date': date.today() + timedelta(days=7),
                'time': '1:00 PM',
                'message': 'Orbital surgery consultation',
                'status': 'confirmed'
            }
        ]

        created_count = 0
        for appointment_data in test_appointments:
            appointment = Appointment.objects.create(**appointment_data)
            created_count += 1
            self.stdout.write(
                self.style.SUCCESS(
                    f'Created appointment: {appointment.name} - {appointment.date} at {appointment.time}'
                )
            )

        self.stdout.write(
            self.style.SUCCESS(f'\nSuccessfully created {created_count} test appointments!')
        )
        self.stdout.write(
            self.style.WARNING('You can now log into the admin dashboard to see real data.')
        ) 