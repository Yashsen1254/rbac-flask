export interface LoginRequest {
  Email: string;
  Password: string;
}

export interface LoginResponse {
  message: string;
}

export interface PagePermission {
  AddPermission: boolean;
  EditPermission: boolean;
  DeletePermission: boolean;
  ViewPermission: boolean;
}

export type UserPermissions = Record<string, PagePermission>;

export interface PermissionsResponse {
  permissions: UserPermissions;
}