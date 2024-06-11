import request from "../config";
import { Request } from "../../interfaces/brand_category";


const brand_category:Request ={
    get_brand_category: (params) => request.get(`/brand-category/search?limit=${params.limit}&page=${params.page}`, {params}),
    create_brand_category: (data) => request.post("/brand-category/create", data),
    delete_brand_category: (id:any) => request.delete(`/brand-category/delete/${id}`),
    update_brand_category: (id,data) => request.patch(`/brand-category/update/${id}`, data),
    // get_all_sub_cat: (params) => request.get("/sub-category/search?limit=10&page=1", {params})
}

export default brand_category;