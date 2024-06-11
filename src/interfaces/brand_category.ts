export interface GetParams{
    limit:number;
    page:number
    search?: string
}

export interface CreateBrandCategory{
    name: string;
    brand_id: any;
}
export interface UpdateBrandCategory{
    name: string;
    brand_id: any;
}




export interface BrandCategoryStore {
    datass: any[]
    isLoading: boolean
    totalCount: any
    get_brand_category_Data: (params:GetParams) => Promise<any>
    createData: (data:CreateBrandCategory) => Promise<any>
    deleteData: (id:string) => Promise<any>
    updateData: (id:any,data:UpdateBrandCategory) => Promise<any>
    // getAllSubData: (id:any) => Promise<any>
}


export interface Request {
    get_brand_category: (params:GetParams) => Promise<any>
    create_brand_category: (data:CreateBrandCategory) => Promise<any>
    delete_brand_category: (id:string) => Promise<any>
    update_brand_category: (id:any ,data:UpdateBrandCategory) => Promise<any>
    // get_all_sub_cat: (params:GetParams) => Promise<any>
}