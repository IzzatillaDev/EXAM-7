import request from "../config";
import { Request } from "../../interfaces/auth";

const auth: Request = {
    sign_up: (data) => request.post("/auth/admin/sign-up", data),
    login: (data) => request.post("/auth/sign-in", data),
    // get_admin: (id:any) => request.get(`/admin/${id}`)
}

export default auth;