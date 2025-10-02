export type UserRole = 'admin' | 'staff' | 'volunteer';

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  phone?: string;
  dob?: string;
  user_id: string;
  gender?: string;
  profession?: string;
  
 
  image?: string;
  
 
  aadhar_number?: string;
  pan_number?: string;
  
 
  street?: string;
  sub_district?: string;
  district?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  
 
  is_verified: boolean;
  is_blocked: boolean;
  is_volunteer: boolean;
  is_admin_account: boolean;
  is_business_account: boolean;
  is_staff_account: boolean;
  is_member_account: boolean;
  
 
  is_staff: boolean;
  is_active: boolean;
  is_superuser?: boolean;
  date_joined: string;
  last_login?: string;
  
 
  roles: UserRole[];
}
export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  phone: string;
  dob: string;
  password?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
  tokens?: AuthTokens;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<LoginResponse>;
  register: (data: RegisterRequest) => Promise<LoginResponse>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  verifyToken: (token?: string) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
  setUserData: (userData: User) => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  isAdmin: () => boolean;
  isStaff: () => boolean;
  isVolunteer: () => boolean;
}

// Permission utilities
export interface PermissionConfig {
  roles: UserRole[];
  requireAll?: boolean;
}

export interface RoutePermission {
  path: string;
  permissions: PermissionConfig;
  fallback?: string;
}
