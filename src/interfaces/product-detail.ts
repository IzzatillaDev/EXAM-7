

// export interface CreateProduct{
//     name: string;
//     price:number
//     category_id: number;
//     brand_category_id:number;
//     brand_id: number
// }
// export interface UpdateProducts{
//     name: string;
//     price:number
//     category_id: number;
//     brand_category_id:number;
//     brand_id: number
// }

export interface ProductsId {
    [index :string] :unknown |any
}



export interface ProductDetail {
    data: any[]
    isLoading: boolean
    productsId: ProductsId | null
    totalCount: any
    getData: (id:any) => Promise<any>
    // createData: (data:CreateProduct) => Promise<any>
    // deleteData: (id:string) => Promise<any>
    // updateData: (id:any,data:UpdateProducts) => Promise<any>
}


export interface Request {
    get_product_detail: (id:any) => Promise<any>
    // create_products: (data:CreateProduct) => Promise<any>
    // delete_products: (id:string) => Promise<any>
    // update_products: (id:any ,data:UpdateProducts) => Promise<any>
}