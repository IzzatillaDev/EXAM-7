import request from "../config";
import { Request } from "../../interfaces/admins";

const admins: Request = {
    get_admin: (id:any) => request.get(`/admin/${id}`),
}

export default admins;