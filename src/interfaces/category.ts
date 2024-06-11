export interface GetParams{
    limit:number;
    page:number
    search?: string
}

export interface CreateCategory{
    name: string;
}


export interface UpdateCategory{
   name: string;
}

export interface createSubCategory{
    name:string;
    parent_category_id: number | string
}

export interface CategoryStore {
    data: any[]
    isLoading: boolean
    totalCount: any
    getData: (params:GetParams) => Promise<any>
    createData: (data:CreateCategory) => Promise<any>
    deleteData: (id:string) => Promise<any>
    updateData: (id:any,data:UpdateCategory) => Promise<any>
}


export interface Request {
    get_category: (params:GetParams) => Promise<any>
    create_category: (data:CreateCategory) => Promise<any>
    delete_category: (id:string) => Promise<any>
    update_category: (id:any ,data:UpdateCategory) => Promise<any>
}