import { create } from "zustand"
import { BrandsStore } from "../interfaces/brands"
import brands from "../service/brands"
import Notification from "../utils/notification"

const useBrandsStore = create<BrandsStore>((set) => ({
    datas: [],
    isLoading: true,
    get_brand_Data: async (params) => {
        try {
            set({ isLoading: true })
            const response = await brands.get_brands(params)
            console.log(response)
            if (response.status === 200) {
                response.data.data.brands.forEach((item: any, index: number) => {
                    item.index = index + 1
                })
                set({ datas: response?.data?.data.brands })
            }
            set({ isLoading: false })
        } catch (error) {
            console.log(error)
        }
    },
    createData: async (data: any) => {
        try {
            const response = await brands.create_brands(data)
            // console.log(response)
            if (response.status === 201) {
                // Notification({ title: "Successufully created", type: "default" })
                set((state) => ({ datas: [...state.datas, response.data] }))
                return response?.status

            }
        } catch (error) {
            Notification({ title: "Error", type: "warning" })
        }

    },
    deleteData: async (id) => {
        try {
            const response = await brands.delete_brands(id)
            console.log(response)
            if (response.status === 200) {
                Notification({ title: "Successufully deleted", type: "default" })
                set((state) => ({ datas: state.datas.filter((item) => item.id !== id) }))
            }
        } catch (error) {
            Notification({ title: "Error", type: "warning" })
        }
    },
    updateData: async (data, id) => {
        try {
            const response = await brands.update_brands(id, data)
            console.log(response)
            if (response.status === 200) {
                Notification({ title: "Successufully updated", type: "default" })
                set((state) => ({ datas: state.datas.filter((item) => item.id !== id) }))
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            }
        } catch (error) {
            Notification({ title: "Error", type: "warning" })
        }
    },
}))

export default useBrandsStore

