import request from "../config";
import { Request } from "../../interfaces/category";


const categories:Request ={
    get_category: (params) => request.get(`/category/search?limit=${params.limit}&page=${params.page}`, {params}),
    create_category: (data) => request.post("/category/create", data),
    delete_category: (id) => request.delete(`/category/delete/${id}`),
    update_category: (id,data) => request.patch(`/category/update/${id}`, data),
    // get_all_sub_cat: (params) => request.get(`/sub-category/search?limit=${params.limit}&page=${params.limit}`, {params}),
    // create_all_sub_cat: (datas) => request.post("/sub-category", {datas})
    

}

export default categories;