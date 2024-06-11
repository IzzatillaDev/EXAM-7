export interface GetParams{
    limit:number;
    page:number
    search: string
}

export interface OneCategoryId{
    id:any;
    limit:number;
    page:number
}

export interface CreateBrand{
    name: string;
    description: string;
    category_id: any;
    file?: string;
}

export interface UpdateBrands{
    name: string;
    description: string
    category_id:number;
}


export interface BrandsStore{
    datas:any[]
    isLoading: boolean
    get_brand_Data: (params:GetParams) => Promise<any>
    createData: (data:CreateBrand) => Promise<any>
    deleteData: (id:number) => Promise<any>
    updateData: (id:any,data:UpdateBrands) => Promise<any>
}



export interface Request{
    get_brands: (params:GetParams) => Promise<any>
    create_brands: (data:CreateBrand) => Promise<any>
    delete_brands: (id:number) => Promise<any>
    update_brands: (id:any,data:UpdateBrands) => Promise<any>
}
