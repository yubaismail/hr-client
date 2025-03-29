export const ROLES = {
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
    MANAGER: 'manager', // Added a new role
  };
  
  export const ENDPOINTS = {
    // Auth endpoints
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY_TOKEN: '/auth/verify',
    RESET_PASSWORD: '/auth/reset-password',
    
    // User management
    EMPLOYEES: '/employees',
    EMPLOYEE_DETAILS: (id) => `/employees/${id}`,
    
    // Attendance management
    ATTENDANCE: '/attendance',
    ATTENDANCE_BY_USER: (userId) => `/attendance/user/${userId}`,
    ATTENDANCE_REPORT: '/attendance/report',
    
    // Dashboard
    DASHBOARD_STATS: '/dashboard/stats',
  };
  
  // Application status codes
  export const STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    COMPLETED: 'completed',
  };
  
  // Pagination defaults
  export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
  };