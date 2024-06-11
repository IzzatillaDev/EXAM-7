export interface GetParams{
    limit:number;
    page:number
    parent_category_id: number | string
    search?: string
}

// export interface UpdateCategory{
//    name: string;
// }

export interface createSubCategory{
    name:string;
    parent_category_id: number | string
}

export interface updateSubCategory{
    name: string;
    parent_category_id: number | string
}

export interface SubCategoryStore {
    data: any[]
    isLoading: boolean
    totalCount: any
    getData: (params:GetParams) => Promise<any>
    createData: (data:createSubCategory) => Promise<any>
    deleteData: (id:any) => Promise<any>
    updateData: (id:any,data:updateSubCategory) => Promise<any>
    // deleteData: (id:string) => Promise<any>
}


export interface Request {
    get_sub_category: (params:GetParams) => Promise<any>
    create_sub_category: (data:createSubCategory) => Promise<any>
    delete_sub_category: (id:any) => Promise<any>
    update_sub_category: (id:any,data:updateSubCategory) => Promise<any>
    // delete_category: (id:string) => Promise<any>
    // update_category: (id:any ,data:UpdateCategory) => Promise<any>
}