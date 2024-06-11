import request from "../config";
import { Request } from "../../interfaces/product-detail";


const product_detail: Request = {
    get_product_detail: (id:any) => request.get(`/products/${id}`),
    // create_products: (data) => request.post("/products/create", data),
    // delete_products: (id:any) => request.delete(`/products/delete/${id}`),
    // update_products: (id,data) => request.patch(`/products/update/${id}`, data),
    // get_all_sub_cat: (params) => request.get("/sub-category/search?limit=10&page=1", {params})
    

}

export default product_detail;