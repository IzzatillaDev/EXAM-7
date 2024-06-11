import request from "../config";
import { Request } from "../../interfaces/products";


const products:Request ={
    get_products: (params) => request.get(`/products/search?limit=${params.limit}&page=${params.page}`, {params}),
    create_products: (data) => request.post("/products/create", data),
    delete_products: (id:any) => request.delete(`/products/delete/${id}`),
    update_products: (id,data) => request.patch(`/products/update/${id}`, data),
    // get_all_sub_cat: (params) => request.get("/sub-category/search?limit=10&page=1", {params})
    

}

export default products;