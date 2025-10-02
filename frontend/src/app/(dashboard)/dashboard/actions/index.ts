"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface NavItem {
  title: string;
  url: string;
  icon: string;
  roles: string[];
  isActive?: boolean;
  children?: NavItem[];
}

export interface UserPermissions {
  canViewMembers: boolean;
  canManageMembers: boolean;
  canViewBranches: boolean;
  canManageBranches: boolean;
  canViewReports: boolean;
  canManageReports: boolean;
  canViewSettings: boolean;
  canManageSettings: boolean;
  canViewUsers: boolean;
  canManageUsers: boolean;
}

export async function validateUserSession(): Promise<{
  isValid: boolean;
  user: any | null;
  error?: string;
}> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return {
        isValid: false,
        user: null,
        error: "No access token found"
      };
    }

    const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const response = await fetch(`${baseURL}/account/token/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: accessToken }),
    });

    if (!response.ok) {
      return {
        isValid: false,
        user: null,
        error: "Invalid token"
      };
    }

    const userResponse = await fetch(`${baseURL}/dashboard/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!userResponse.ok) {
      return {
        isValid: false,
        user: null,
        error: "Failed to fetch user data"
      };
    }

    const userData = await userResponse.json();

    return {
      isValid: true,
      user: userData,
    };
  } catch (error) {
    console.error("Session validation error:", error);
    return {
      isValid: false,
      user: null,
      error: "Session validation failed"
    };
  }
}

export async function getUserPermissions(user: any): Promise<UserPermissions> {
  const permissions: UserPermissions = {
    canViewMembers: false,
    canManageMembers: false,
    canViewBranches: false,
    canManageBranches: false,
    canViewReports: false,
    canManageReports: false,
    canViewSettings: false,
    canManageSettings: false,
    canViewUsers: false,
    canManageUsers: false,
  };

  if (!user) return permissions;

  if (user.is_superuser || user.is_admin_account) {
    return {
      canViewMembers: true,
      canManageMembers: true,
      canViewBranches: true,
      canManageBranches: true,
      canViewReports: true,
      canManageReports: true,
      canViewSettings: true,
      canManageSettings: true,
      canViewUsers: true,
      canManageUsers: true,
    };
  }

  if (user.is_staff || user.is_staff_account) {
    permissions.canViewMembers = true;
    permissions.canManageMembers = true;
    permissions.canViewBranches = true;
    permissions.canManageBranches = false;
    permissions.canViewReports = true;
    permissions.canManageReports = false;
    permissions.canViewSettings = true;
    permissions.canManageSettings = false;
    permissions.canViewUsers = true;
    permissions.canManageUsers = false;
  }

  if (user.is_volunteer) {
    permissions.canViewMembers = true;
    permissions.canManageMembers = false;
    permissions.canViewBranches = true;
    permissions.canManageBranches = false;
    permissions.canViewReports = true;
    permissions.canManageReports = false;
    permissions.canViewSettings = false;
    permissions.canManageSettings = false;
    permissions.canViewUsers = false;
    permissions.canManageUsers = false;
  }

  return permissions;
}

export async function getNavigationItems(): Promise<NavItem[]> {
  const sessionValidation = await validateUserSession();
  
  if (!sessionValidation.isValid || !sessionValidation.user) {
    redirect("/auth/login");
  }

  const user = sessionValidation.user;
  const permissions = await getUserPermissions(user);

  const navigationItems: NavItem[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: "Home",
      roles: ["admin", "staff", "volunteer"],
      isActive: true,
    },
  ];


  if (permissions.canViewMembers) {
    navigationItems.push({
      title: "Members",
      url: "/dashboard/members",
      icon: "Users",
      roles: ["admin", "staff", "volunteer"],
      children: permissions.canManageMembers ? [
        {
          title: "View Members",
          url: "/dashboard/members",
          icon: "Eye",
          roles: ["admin", "staff", "volunteer"],
        },
        {
          title: "Add Member",
          url: "/dashboard/members/add",
          icon: "UserPlus",
          roles: ["admin", "staff"],
        },
        {
          title: "Manage Members",
          url: "/dashboard/members/manage",
          icon: "Settings",
          roles: ["admin", "staff"],
        },
      ] : [
        {
          title: "View Members",
          url: "/dashboard/members",
          icon: "Eye",
          roles: ["admin", "staff", "volunteer"],
        },
      ],
    });
  }


  if (permissions.canViewBranches) {
    const branchChildren = [
      {
        title: "View Branches",
        url: "/dashboard/branches",
        icon: "Eye",
        roles: ["admin", "staff", "volunteer"],
      },
    ];

    if (permissions.canManageBranches) {
      branchChildren.push(
        {
          title: "Add Branch",
          url: "/dashboard/branches/add",
          icon: "Plus",
          roles: ["admin"],
        },
        {
          title: "Manage Branches",
          url: "/dashboard/branches/manage",
          icon: "Settings",
          roles: ["admin"],
        }
      );
    }

    navigationItems.push({
      title: "Branches",
      url: "/dashboard/branches",
      icon: "Building",
      roles: ["admin", "staff", "volunteer"],
      children: branchChildren,
    });
  }


  if (permissions.canViewReports) {
    const reportChildren = [
      {
        title: "View Reports",
        url: "/dashboard/reports",
        icon: "Eye",
        roles: ["admin", "staff", "volunteer"],
      },
    ];

    if (permissions.canManageReports) {
      reportChildren.push(
        {
          title: "Create Report",
          url: "/dashboard/reports/create",
          icon: "Plus",
          roles: ["admin"],
        },
        {
          title: "Manage Reports",
          url: "/dashboard/reports/manage",
          icon: "Settings",
          roles: ["admin"],
        }
      );
    }

    navigationItems.push({
      title: "Reports",
      url: "/dashboard/reports",
      icon: "FileText",
      roles: ["admin", "staff", "volunteer"],
      children: reportChildren,
    });
  }


  if (permissions.canViewUsers) {
    const userChildren = [
      {
        title: "View Users",
        url: "/dashboard/users",
        icon: "Eye",
        roles: ["admin", "staff"],
      },
    ];

    if (permissions.canManageUsers) {
      userChildren.push(
        {
          title: "Add User",
          url: "/dashboard/users/add",
          icon: "UserPlus",
          roles: ["admin"],
        },
        {
          title: "Manage Users",
          url: "/dashboard/users/manage",
          icon: "Settings",
          roles: ["admin"],
        },
        {
          title: "User Roles",
          url: "/dashboard/users/roles",
          icon: "Shield",
          roles: ["admin"],
        }
      );
    }

    navigationItems.push({
      title: "Users",
      url: "/dashboard/users",
      icon: "User",
      roles: ["admin", "staff"],
      children: userChildren,
    });
  }


  if (permissions.canViewSettings) {
    const settingsChildren = [
      {
        title: "View Settings",
        url: "/dashboard/settings",
        icon: "Eye",
        roles: ["admin", "staff"],
      },
    ];

    if (permissions.canManageSettings) {
      settingsChildren.push(
        {
          title: "System Settings",
          url: "/dashboard/settings/system",
          icon: "Cog",
          roles: ["admin"],
        },
        {
          title: "Security Settings",
          url: "/dashboard/settings/security",
          icon: "Shield",
          roles: ["admin"],
        }
      );
    }

    navigationItems.push({
      title: "Settings",
      url: "/dashboard/settings",
      icon: "Settings",
      roles: ["admin", "staff"],
      children: settingsChildren,
    });
  }

  return navigationItems;
}

export async function checkRouteAccess(route: string): Promise<{
  hasAccess: boolean;
  userRole: string | null;
  redirectTo?: string;
}> {
  const sessionValidation = await validateUserSession();
  
  if (!sessionValidation.isValid || !sessionValidation.user) {
    return {
      hasAccess: false,
      userRole: null,
      redirectTo: "/auth/login"
    };
  }

  const user = sessionValidation.user;
  const permissions = await getUserPermissions(user);

  let userRole = "volunteer";
  if (user.is_superuser || user.is_admin_account) {
    userRole = "admin";
  } else if (user.is_staff || user.is_staff_account) {
    userRole = "staff";
  }


  const routePermissions: Record<string, (permissions: UserPermissions) => boolean> = {
    "/dashboard": () => true,
    "/dashboard/members": (p) => p.canViewMembers,
    "/dashboard/members/add": (p) => p.canManageMembers,
    "/dashboard/members/manage": (p) => p.canManageMembers,
    "/dashboard/branches": (p) => p.canViewBranches,
    "/dashboard/branches/add": (p) => p.canManageBranches,
    "/dashboard/branches/manage": (p) => p.canManageBranches,
    "/dashboard/reports": (p) => p.canViewReports,
    "/dashboard/reports/create": (p) => p.canManageReports,
    "/dashboard/reports/manage": (p) => p.canManageReports,
    "/dashboard/users": (p) => p.canViewUsers,
    "/dashboard/users/add": (p) => p.canManageUsers,
    "/dashboard/users/manage": (p) => p.canManageUsers,
    "/dashboard/users/roles": (p) => p.canManageUsers,
    "/dashboard/settings": (p) => p.canViewSettings,
    "/dashboard/settings/system": (p) => p.canManageSettings,
    "/dashboard/settings/security": (p) => p.canManageSettings,
  };

  const routeChecker = routePermissions[route];
  const hasAccess = routeChecker ? routeChecker(permissions) : false;

  return {
    hasAccess,
    userRole,
    redirectTo: hasAccess ? undefined : "/dashboard"
  };
}

export async function getUserRole(): Promise<{
  role: string;
  roleDisplay: string;
  roleColor: string;
  permissions: UserPermissions;
} | null> {
  const sessionValidation = await validateUserSession();
  
  if (!sessionValidation.isValid || !sessionValidation.user) {
    return null;
  }

  const user = sessionValidation.user;
  const permissions = await getUserPermissions(user);

  if (user.is_superuser || user.is_admin_account) {
    return {
      role: "admin",
      roleDisplay: "Administrator",
      roleColor: "destructive",
      permissions,
    };
  }

  if (user.is_staff || user.is_staff_account) {
    return {
      role: "staff",
      roleDisplay: "Staff Member",
      roleColor: "default",
      permissions,
    };
  }

  if (user.is_volunteer) {
    return {
      role: "volunteer",
      roleDisplay: "Volunteer",
      roleColor: "secondary",
      permissions,
    };
  }

  return {
    role: "member",
    roleDisplay: "Member",
    roleColor: "outline",
    permissions,
  };
}
