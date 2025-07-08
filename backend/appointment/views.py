from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils.decorators import method_decorator
from django.views import View
import json
from datetime import datetime
from .models import Appointment


@method_decorator(csrf_exempt, name='dispatch')
class AppointmentCreateView(View):
    """Handle creation (POST) and listing (GET) of appointments."""

    def post(self, request):
        try:
            # Parse JSON data
            data = json.loads(request.body)

            # Required fields validation
            required_fields = ['name', 'email', 'phone', 'date', 'time']
            for field in required_fields:
                if not data.get(field):
                    return JsonResponse({'error': f'{field} is required'}, status=400)

            # Validate date format (YYYY-MM-DD)
            try:
                appointment_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
            except ValueError:
                return JsonResponse({'error': 'Invalid date format. Use YYYY-MM-DD'}, status=400)

            # Create Appointment
            appointment = Appointment.objects.create(
                name=data['name'],
                email=data['email'],
                phone=data['phone'],
                date=appointment_date,
                time=data['time'],
                message=data.get('message', '')
            )

            return JsonResponse({
                'success': True,
                'message': 'Appointment created successfully',
                'appointment_id': appointment.id,
                'data': {
                    'id': appointment.id,
                    'name': appointment.name,
                    'email': appointment.email,
                    'phone': appointment.phone,
                    'date': appointment.date.strftime('%Y-%m-%d'),
                    'time': appointment.time,
                    'message': appointment.message,
                    'status': appointment.status,
                    'created_at': appointment.created_at.isoformat()
                }
            }, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f'Server error: {str(e)}'}, status=500)

    def get(self, request):
        """Return list of all appointments (admin use)."""
        appointments = Appointment.objects.all()
        appointments_data = [
            {
                'id': a.id,
                'name': a.name,
                'email': a.email,
                'phone': a.phone,
                'date': a.date.strftime('%Y-%m-%d'),
                'time': a.time,
                'message': a.message,
                'status': a.status,
                'created_at': a.created_at.isoformat(),
                'updated_at': a.updated_at.isoformat(),
            } for a in appointments
        ]
        return JsonResponse({'success': True, 'appointments': appointments_data})


@method_decorator(csrf_exempt, name='dispatch')
class AppointmentDetailView(View):
    """Handle individual appointment operations: GET, PUT, DELETE."""

    def get(self, request, appointment_id):
        """Get single appointment details."""
        try:
            appointment = get_object_or_404(Appointment, id=appointment_id)
            return JsonResponse({
                'success': True,
                'appointment': {
                    'id': appointment.id,
                    'name': appointment.name,
                    'email': appointment.email,
                    'phone': appointment.phone,
                    'date': appointment.date.strftime('%Y-%m-%d'),
                    'time': appointment.time,
                    'message': appointment.message,
                    'status': appointment.status,
                    'created_at': appointment.created_at.isoformat(),
                    'updated_at': appointment.updated_at.isoformat(),
                }
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    def put(self, request, appointment_id):
        """Update appointment."""
        try:
            appointment = get_object_or_404(Appointment, id=appointment_id)
            data = json.loads(request.body)

            # Update fields if provided
            if 'name' in data:
                appointment.name = data['name']
            if 'email' in data:
                appointment.email = data['email']
            if 'phone' in data:
                appointment.phone = data['phone']
            if 'date' in data:
                try:
                    appointment.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
                except ValueError:
                    return JsonResponse({'error': 'Invalid date format. Use YYYY-MM-DD'}, status=400)
            if 'time' in data:
                appointment.time = data['time']
            if 'message' in data:
                appointment.message = data['message']
            if 'status' in data:
                if data['status'] not in ['pending', 'confirmed', 'cancelled', 'completed']:
                    return JsonResponse({'error': 'Invalid status'}, status=400)
                appointment.status = data['status']

            appointment.save()

            return JsonResponse({
                'success': True,
                'message': 'Appointment updated successfully',
                'appointment': {
                    'id': appointment.id,
                    'name': appointment.name,
                    'email': appointment.email,
                    'phone': appointment.phone,
                    'date': appointment.date.strftime('%Y-%m-%d'),
                    'time': appointment.time,
                    'message': appointment.message,
                    'status': appointment.status,
                    'updated_at': appointment.updated_at.isoformat(),
                }
            })

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    def delete(self, request, appointment_id):
        """Delete appointment."""
        try:
            appointment = get_object_or_404(Appointment, id=appointment_id)
            appointment.delete()
            return JsonResponse({
                'success': True,
                'message': 'Appointment deleted successfully'
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


# Optional function-based alternative
@csrf_exempt
@require_http_methods(["POST"])
def create_appointment(request):
    try:
        data = json.loads(request.body)
        appointment = Appointment.objects.create(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            date=data['date'],
            time=data['time'],
            message=data.get('message', '')
        )
        return JsonResponse({'success': True, 'appointment_id': appointment.id}, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
@require_http_methods(["GET"])
def get_appointment_stats(request):
    """Get appointment statistics."""
    try:
        total_appointments = Appointment.objects.count()
        pending_count = Appointment.objects.filter(status='pending').count()
        confirmed_count = Appointment.objects.filter(status='confirmed').count()
        completed_count = Appointment.objects.filter(status='completed').count()
        cancelled_count = Appointment.objects.filter(status='cancelled').count()

        return JsonResponse({
            'success': True,
            'stats': {
                'total': total_appointments,
                'pending': pending_count,
                'confirmed': confirmed_count,
                'completed': completed_count,
                'cancelled': cancelled_count
            }
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
