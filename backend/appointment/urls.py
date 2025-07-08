from django.urls import path
from .views import AppointmentCreateView, AppointmentDetailView, create_appointment, get_appointment_stats

urlpatterns = [
    # Main appointment endpoints
    path('appointments/', AppointmentCreateView.as_view(), name='appointments'),
    path('appointments/<int:appointment_id>/', AppointmentDetailView.as_view(), name='appointment_detail'),
    
    # Statistics endpoint
    path('appointments/stats/', get_appointment_stats, name='appointment_stats'),
    
    # Alternative function-based endpoint (optional, for demonstration)
    path('appointments-fn/', create_appointment, name='appointments_fn'),
] 