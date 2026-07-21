export interface User {
    User_Id: number;
    Name: string;
    Email: string;
    Password?: string;
}

export interface UserRequest {
    Name: string;
    Email: string;
    Password: string;
}