export interface RolePermission {
    RolePermission_Id: number;
    Role_Id: number;
    Role_Name?: string;
    Page_Id: number;
    PageName?: string;
    AddPermission: boolean;
    EditPermission: boolean;
    DeletePermission: boolean;
    ViewPermission: boolean;
}

export interface RolePermissionRequest {
    Role_Id: number;
    Page_Id: number;
    AddPermission: boolean;
    EditPermission: boolean;
    DeletePermission: boolean;
    ViewPermission: boolean;
}
