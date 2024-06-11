import request from "../config";
import { Request } from "../../interfaces/brands";

const brands: Request = {
    get_brands: (params) => request.get(`/brand/search?limit=${params.limit}&page=${params.page}`, {params}),
    create_brands: (data) => request.post("/brand/create",data),
    delete_brands: (id) => request.delete(`/brand/delete/${id}`),
    update_brands: (id,data) => request.patch(`/brand/update/${id}`,data),
    get_brand_category_id: (id) => request.get(`/brand/category/${id}?limit=100&page=1`)

}

export default brands;