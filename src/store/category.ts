import {create} from "zustand"
import { CategoryStore } from "../interfaces/category"
import categories from "../service/category"
import Notification from "../utils/notification"
// import { setDataCookie } from "../utils/data-service"


const useCategoryStore = create<CategoryStore>((set) => ({
     data: [],
     isLoading: false,
     totalCount: 1,
     
     getData: async (params) => {
        try {
            set({isLoading: true})
            const response = await categories.get_category(params)
            console.log(response)
            if(response.status === 200){
                response.data.data.categories.forEach((item: any, index: number) => {
                    item.index = index + 1
                })

                set({
                    totalCount: Math.ceil(response.data.data.count / params.limit),
                    data: response?.data?.data.categories
                })
                set({ data: response?.data?.data.categories })
            }
            set({isLoading: false})

        } catch (error) {
            console.log(error)
        }
     },

     createData: async (data) => { 
        try {
            const response = await categories.create_category(data)
            console.log(response)
            if(response.status === 201){
                set((state) => ({ data: [...state.data, response.data.data] }))
                return response.status
            }

        } catch (error) {
            Notification({title: 'Error creating category', type: "warning"})
        }
     },

     deleteData: async (id) => {
        try {
            const response = await categories.delete_category(id)
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

     updateData: async (data,id) => {
        // console.log("updateData");
        try {
            const response = await categories.update_category(id,data)
            console.log(response)
            if(response.status === 200){
                Notification({title: "successfully updated", type: "default"})
                set((state) => ({ data: state.data.filter((item) => item.id!== id)}))
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            }
        } catch (error) {
            console.log(error);
            Notification({title: "erroreeeeee updating category", type: "warning"})
        }
     },
    //  getAllSubData: async (params) => {
    //     try {
    //         const response = await categories.get_all_sub_cat(params)
    //         console.log(response)
    //         if(response.status === 200){
    //             response.data.subcategories.forEach((item: any, index: number) => {
    //                 item.index = index + 1
    //             })
    //             // set((state) => ({ data: state.data.filter((item) => item.id !== id)}))
    //             // return response
    //         }
    //     }
        
    //     catch (error) {
    //         console.log(error)
    //     }
    //  },
    //  createAllSubData: async (datas) => {
    //     try {
    //         const response = await categories.create_all_sub_cat(datas)
    //         console.log(response)
    //         // if(response.status === 200){
    //         //     response.data.subcategories.forEach((item: any, index: number) => {
    //         //         item.index = index + 1
    //         //     })
    //         //     set((state) => ({ data: state.data.filter((item) => item.id !== id)}))
    //         //     return response
    //         // }
    //     }
        
    //     catch (error) {
    //         console.log(error)
    //     }
    //  },


     
}))

export default useCategoryStore;