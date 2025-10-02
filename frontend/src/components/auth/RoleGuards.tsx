"use client";
import { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/types/auth.types";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: UserRole[];
  requireAll?: boolean;
  fallback?: ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles = [],
  requireAll = false,
  fallback = (
    <div>Access denied. You don't have permission to view this page.</div>
  ),
}) => {
  const { isAuthenticated, hasAnyRole, hasRole, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>;
  }

  if (roles.length === 0) {
    return <>{children}</>;
  }

  const hasAccess = requireAll
    ? roles.every((role) => hasRole(role))
    : hasAnyRole(roles);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

interface RoleGuardProps {
  children: ReactNode;
  roles: UserRole[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

/**
 * Component for conditionally rendering content based on user roles
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  roles,
  requireAll = false,
  fallback = null,
}) => {
  const { hasAnyRole, hasRole, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  const hasAccess = requireAll
    ? roles.every((role) => hasRole(role))
    : hasAnyRole(roles);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

interface AdminGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component for admin-only content
 */
export const AdminGuard: React.FC<AdminGuardProps> = ({
  children,
  fallback = null,
}) => {
  const { isAdmin } = useAuth();
  return isAdmin() ? <>{children}</> : <>{fallback}</>;
};

interface StaffGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component for staff-only content
 */
export const StaffGuard: React.FC<StaffGuardProps> = ({
  children,
  fallback = null,
}) => {
  const { isStaff } = useAuth();
  return isStaff() ? <>{children}</> : <>{fallback}</>;
};

interface VolunteerGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component for volunteer-only content
 */
export const VolunteerGuard: React.FC<VolunteerGuardProps> = ({
  children,
  fallback = null,
}) => {
  const { isVolunteer } = useAuth();
  return isVolunteer() ? <>{children}</> : <>{fallback}</>;
};
