export interface Product {
    Product_Id: number;
    Name: string;
    Price: number;
    Category_Id: number;
    Category_Name?: string;
}

export interface ProductRequest {
    Name: string;
    Price: number;
    Category_Id: number;
}