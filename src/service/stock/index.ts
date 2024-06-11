import request from "../config";
import { Request } from "../../interfaces/stock";


const stock:Request ={
    get_stock: (params) => request.get("/stock", {params}),
    create_stock: (data) => request.post("/stock/create", data),
    delete_stock: (id:any) => request.delete(`/stock/delete/${id}`),
    update_stock: (id,data) => request.patch(`/stock/update/${id}`, data),
    // get_all_sub_cat: (params) => request.get("/sub-category/search?limit=10&page=1", {params})
    

}

export default stock;