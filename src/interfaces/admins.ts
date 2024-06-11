export interface AdminStore{
    data:any[]
    isLoading: boolean
    getData: (id:any) => Promise<any>
}


export interface Request{
    get_admin: (id:any) => Promise<any>
}