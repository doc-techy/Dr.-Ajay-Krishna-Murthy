# Admin Authentication Documentation

## 🔒 Admin Dashboard Protection

The admin dashboard at `/admin` is now protected and requires authentication. Only users with admin privileges can access this route.

## 🚀 Quick Access

### Development Environment
- **Admin Dashboard**: http://localhost:3000/admin
- **Login Page**: http://localhost:3000/login
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin123`

### Production Environment
- Update credentials in `app.config.json`
- Implement proper backend authentication

## 📊 Database Integration

The admin dashboard now displays **real data from the database** instead of dummy data:

- **Live Appointments**: Fetches actual appointment data from the backend API
- **Real-time Stats**: Shows current appointment statistics (total, pending, confirmed, completed, cancelled)
- **Status Management**: Update appointment status directly in the database
- **Delete Functionality**: Remove appointments from the database
- **Auto-refresh**: Data refreshes after any changes

### Test Data
To populate the database with sample appointments for testing:
```bash
cd backend
source venv_new/bin/activate
python manage.py create_test_appointments
```

This creates 6 test appointments with different statuses to demonstrate the dashboard functionality.

## 🔧 How It Works

### 1. Authentication Flow
```
User → /admin → Check Auth → Not Logged In → Redirect to /login
                     ↓
                Logged In → Show Admin Dashboard → Fetch Real Data from DB
```

### 2. Data Flow
```
Admin Dashboard → API Calls → Django Backend → Database
     ↓                                              ↑
Display Data ← JSON Response ← Database Query ←-----┘
```

### 3. API Endpoints Used
- `GET /api/appointments/` - Fetch all appointments
- `GET /api/appointments/stats/` - Get appointment statistics  
- `PUT /api/appointments/{id}/` - Update appointment status
- `DELETE /api/appointments/{id}/` - Delete appointment

### 4. Components

#### Auth Provider (`/src/components/AuthProvider.tsx`)
- Manages authentication state
- Provides login/logout functions
- Stores auth data in localStorage

#### Protected Route (`/src/components/ProtectedRoute.tsx`)
- Wraps protected pages
- Redirects unauthorized users
- Shows loading state during auth check

#### Login Page (`/src/app/login/page.tsx`)
- Simple login form
- Validates credentials
- Redirects to admin dashboard on success

#### Admin Dashboard (`/src/components/AdminDashboard.tsx`)
- Fetches real appointment data from API
- Displays loading states and error handling
- Allows status updates and deletions
- Shows real-time statistics

## 📝 Configuration

### Change Admin Credentials

1. **For Development**: Edit `app.config.json`
   ```json
   "admin": {
     "username": "your-username",
     "password": "your-password"
   }
   ```

2. **For Production**: 
   - Update `app.config.json` production section
   - Implement proper backend authentication
   - Use environment variables for sensitive data

## 🔐 Security Notes

### Current Implementation (Development)
- Simple client-side authentication
- Credentials stored in config file
- Session stored in localStorage
- 24-hour session expiry
- **Real database operations** (create, read, update, delete)

### Production Recommendations
1. **Replace with proper authentication**:
   - Use NextAuth.js or similar
   - Implement JWT tokens
   - Connect to backend auth API

2. **Security measures**:
   - Never store passwords in plain text
   - Use HTTPS in production
   - Implement CSRF protection
   - Add rate limiting
   - Protect API endpoints with authentication

3. **Backend integration**:
   ```javascript
   // Example: Replace mock auth with API call
   const response = await fetch(`${backendUrl}/api/auth/login`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ username, password })
   });
   ```

## 🛠️ Customization

### Add More Protected Routes
```javascript
// In any page component:
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function SecretPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <YourComponent />
    </ProtectedRoute>
  );
}
```

### Extend User Roles
```javascript
// In auth.ts, extend the User interface:
interface User {
  id: string;
  username: string;
  isAdmin: boolean;
  role: 'admin' | 'doctor' | 'staff'; // Add more roles
}
```

### Add More API Endpoints
```javascript
// In AdminDashboard.tsx, add new functionality:
const exportData = async () => {
  const response = await fetch(`${backendUrl}/api/appointments/export/`);
  // Handle export functionality
};
```

## 🚨 Important Notes

1. **This is a basic implementation** suitable for development/demo
2. **DO NOT use in production** without proper security measures
3. **Always use HTTPS** in production
4. **Implement proper backend authentication** before deployment
5. **Use strong, unique passwords** and store them securely
6. **Database operations are REAL** - changes are permanent

## 📚 Next Steps

1. Install a proper authentication library:
   ```bash
   npm install next-auth
   ```

2. Create API endpoints for authentication
3. Implement role-based access control (RBAC)
4. Add password reset functionality
5. Implement two-factor authentication (2FA)
6. Add audit logging for admin actions
7. Add data export functionality
8. Implement appointment scheduling calendar view
9. Add email notifications for appointment changes
10. Create backup and restore functionality 