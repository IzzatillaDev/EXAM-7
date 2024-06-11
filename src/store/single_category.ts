import {create} from "zustand"
import { SubCategoryStore } from "../interfaces/single-category"
import sub_categories from "../service/single-category"
import Notification from "../utils/notification"
// import { setDataCookie } from "../utils/data-service"


const useSubCategoryStore = create<SubCategoryStore>((set) => ({
     data: [],
     isLoading: false,
     totalCount: 1,
     
     getData: async (params) => {
        try {
            const response = await sub_categories.get_sub_category(params)
            console.log(response)
            if(response.status === 200){
                response.data.data.subcategories.forEach((item: any, index: number) => {
                    item.index = index + 1
                })
                set({data: response.data.data.subcategories})
                return response
            }
        }
        
        catch (error) {
            console.log(error)
        }
     },
     createData: async (data) => {
        try {
            const response = await sub_categories.create_sub_category(data)
            console.log(response)
            if(response.status === 201){
                Notification({title: "SubCategory successfully created", type: "default"})
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
                response.data.subcategories.forEach((item: any, index: number) => {
                    item.index = index + 1
                })
                set((state) => ({ data: state.data.filter((item) => item.id !== id)}))
                return response
            }
        }
        
        catch {
            Notification({title: "Something error", type: "warning"})
        }
     },

     deleteData: async (id) => {
        try {
            const response = await sub_categories.delete_sub_category(id)
            console.log(response)
            if(response.status === 200){
                Notification({title: "successfully deleted", type: "default"})
                set((state) => ({ data: state.data.filter((item) => item.id !== id)}))
                setTimeout(() => {
                    window.location.reload()
                }, 1500);

            }
        } catch (error) {
            Notification({title: "failed to delete", type: "error"})
        }
     },

     updateData: async (id,data) => {
        try {
            const response = await sub_categories.update_sub_category(id,data)
            console.log(response)
            if(response.status === 200){
                Notification({title: "successfully deleted", type: "default"})
                set((state) => ({ data: state.data.filter((item) => item.id !== id)}))
                setTimeout(() => {
                    window.location.reload()
                }, 1500);

            }
        } catch (error) {
            Notification({title: "failed to delete", type: "error"})
        }
     },


     
}))

export default useSubCategoryStore;