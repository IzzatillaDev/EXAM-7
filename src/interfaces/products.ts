export interface GetParams{
    limit:number;
    page:number
    search?: string
}

export interface CreateProduct{
    name: string;
    price:number
    category_id: number;
    brand_category_id:number;
    brand_id: number
}
export interface UpdateProducts{
    name: string;
    price:number
    category_id: number;
    brand_category_id:number;
    brand_id: number
}


export interface ProductsStore {
    dataas: any[]
    isLoading: boolean
    totalCount: any
    get_products_Data: (params:GetParams) => Promise<any>
    createData: (data:CreateProduct) => Promise<any>
    deleteData: (id:string) => Promise<any>
    updateData: (id:any,data:UpdateProducts) => Promise<any>
    // getAllSubData: (id:any) => Promise<any>
}


export interface Request {
    get_products: (params:GetParams) => Promise<any>
    create_products: (data:CreateProduct) => Promise<any>
    delete_products: (id:string) => Promise<any>
    update_products: (id:any ,data:UpdateProducts) => Promise<any>
    // get_all_sub_cat: (params:GetParams) => Promise<any>
}