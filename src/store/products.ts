import {create} from "zustand"
import { ProductsStore } from "../interfaces/products"
import products from "../service/products"
import Notification from "../utils/notification"
// import { setDataCookie } from "../utils/data-service"


const useProductsStore = create<ProductsStore>((set) => ({
     dataas: [],
     isLoading: false,
     totalCount: 1,
     
     get_products_Data: async (params) => {
        try {
            set({isLoading: true})
            const response = await products.get_products(params)
            console.log(response)
            if(response.status === 200){
                response.data.data.products.forEach((item: any, index: number) => {
                    item.index = index + 1
                })

                set({
                    totalCount: Math.ceil(response.data.data.count / params.limit),
                    dataas: response?.data?.data.products
                })
                set({ dataas: response?.data?.data.products })
            }
            set({isLoading: false})

        } catch (error) {
            console.log(error)
        }
     },

     createData: async (data) => { 
        try {
            const response = await products.create_products(data)
            console.log(response)
            if(response.status === 201){
                set((state) => ({ dataas: [...state.dataas, response.data.data] }))
                return response.status
            }

        } catch (error) {
            Notification({title: 'Error creating category', type: "warning"})
        }
     },

     deleteData: async (id) => {
        try {
            const response = await products.delete_products(id)
            console.log(response)
            if(response.status === 200){
                Notification({title: "successfully deleted", type: "default"})
                set((state) => ({ dataas: state.dataas.filter((item) => item.id !== id)}))
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
            const response = await products.update_products(id,data)
            console.log(response)
            if(response.status === 200){
                Notification({title: "successfully updated", type: "default"})
                set((state) => ({ dataas: state.dataas.filter((item) => item.id!== id)}))
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            }
        } catch (error) {
            console.log(error);
            Notification({title: "erroreeeeee updating category", type: "warning"})
        }
     },
     


     
}))

export default useProductsStore;