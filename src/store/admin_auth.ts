import { create } from "zustand"
import { AdminStore } from "../interfaces/admins"
import admins from "../service/get_admin"
import Notification from "../utils/notification"
import { getDataFromCookie } from "../utils/data-service"

const useAdminStore = create<AdminStore>((set) => ({
    data: [],
    isLoading: true,
    getData: async (id) => {
        try {
            getDataFromCookie("id")
            const response = await admins.get_admin(id)
            set((state) => ({ data: [...state.data, response.data] }))
            return response?.status
        } catch (error) {
            console.log(error)
        }
    }
}
))

export default useAdminStore