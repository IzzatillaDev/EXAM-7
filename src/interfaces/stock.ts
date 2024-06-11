export interface GetParams{
    limit:number;
    page:number
    search?: string
}

export interface CreateStock{
    category_id:  number | string;
    brand_id:number | string
    product_id: number | string;
    quantity:number;
}4

export interface UpdateProducts{
    category_id:  number | string;
    brand_id:number | string
    product_id: number | string;
    quantity:number;
}


export interface stockStore {
    data: any[]
    isLoading: boolean
    totalCount: any
    getData: () => Promise<any>
    createData: (data:CreateStock) => Promise<any>
    deleteData: (id:string) => Promise<any>
    updateData: (id:any,data:UpdateProducts) => Promise<any>
    // getAllSubData: (id:any) => Promise<any>
}


export interface Request {
    get_stock: () => Promise<any>
    create_stock: (data:CreateStock) => Promise<any>
    delete_stock: (id:string) => Promise<any>
    update_stock: (id:any ,data:UpdateProducts) => Promise<any>
    // get_all_sub_cat: (params:GetParams) => Promise<any>
}