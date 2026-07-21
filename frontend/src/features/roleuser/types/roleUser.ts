export interface RoleUser {
    RoleUser_Id: number;
    Role_Id: number;
    User_Id: number;

    Role_Name?: string;
    User_Name?: string;
}

export interface RoleUserRequest {
    Role_Id: number;
    User_Id: number;
}