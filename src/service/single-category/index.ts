import request from "../config";
import { Request } from "../../interfaces/single-category";


const sub_categories:Request ={
    get_sub_category: (params) => request.get(`/sub-category/search/${params.parent_category_id}?`, {params}),
    create_sub_category: (data) => request.post("/sub-category/create", data),
    delete_sub_category: (id) => request.delete(`/sub-category/delete/${id}`),
    update_sub_category: (id,data) => request.patch(`/sub-category/update/${id}`,data)
    

}

export default sub_categories;