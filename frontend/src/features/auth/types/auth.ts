export interface LoginRequest {
  Email: string;
  Password: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
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
  role: string | null;
}

export interface RegisterRequest {
    Name: string;
    Email: string;
    Password: string;
}

export interface RegisterResponse {
    message: string;
    Email: string;
}

export interface VerifyOTPRequest {
    Email: string;
    OTP: string;
}

export interface VerifyOTPResponse {
    message: string;
}

export interface ResendOTPRequest {
  Email: string;
}

export interface ResendOTPResponse {
  message: string;
}