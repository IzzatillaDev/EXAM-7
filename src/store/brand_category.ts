import { create } from "zustand"
import { BrandCategoryStore } from "../interfaces/brand_category"
import brand_category from "../service/brand_category"
import Notification from "../utils/notification"
// import { setDataCookie } from "../utils/data-service"


const useBrandCategoryStore = create<BrandCategoryStore>((set) => ({
    datass: [],
    isLoading: false,
    totalCount: 1,

    get_brand_category_Data: async (params) => {
        try {
            set({ isLoading: true })
            const response = await brand_category.get_brand_category(params)
            console.log(response)
                if(response.status === 200){
                    response.data.data.brandCategories.forEach((item: any, index: number) => {
                        item.index = index + 1
                    })

                    // console.log(response.data.data.count)
                    set({
                        totalCount: Math.ceil(response.data.data.count / params.limit),
                        datass: response?.data?.data.brandCategories

                })
                set({ datass: response?.data?.data.brandCategories })
            }
            set({isLoading: false})

        } catch (error) {
    console.log(error)
}
     },

     createData: async (data) => { 
        try {
            const response = await brand_category.create_brand_category(data)
            console.log(response)
            if(response.status === 201){
                set((state) => ({ datass: [...state.datass, response.data.data] }))
                return response.status
            }

        } catch (error) {
            Notification({title: 'Error creating category', type: "warning"})
        }
     },

     deleteData: async (id) => {
        try {
            const response = await brand_category.delete_brand_category(id)
            console.log(response)
            if(response.status === 200){
                Notification({title: "successfully deleted", type: "default"})
                set((state) => ({ datass: state.datass.filter((item) => item.id !== id)}))
                setTimeout(() => {
                    window.location.reload()
                }, 1500);

            }
        } catch (error) {
            Notification({title: "failed to delete", type: "error"})
        }
     },

     updateData: async (id,data) => {
        // console.log("updateData");
        try {
            const response = await brand_category.update_brand_category(id,data)
            console.log(response)
            if(response.status === 200){
                Notification({title: "successfully updated", type: "default"})
                set((state) => ({ datass: state.datass.filter((item) => item.id!== id)}))
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            }
        } catch (error) {
            console.log(error);
            Notification({title: "Error updating brand_category", type: "warning"})
        }
     },


     
}))

export default useBrandCategoryStore;