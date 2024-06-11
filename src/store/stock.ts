import {create} from "zustand"
import { stockStore } from "../interfaces/stock"
import stock from "../service/stock"
import Notification from "../utils/notification"
// import { setDataCookie } from "../utils/data-service"
// import { setDataCookie } from "../utils/data-service"


const useStockStore = create<stockStore>((set) => ({
     data: [],
     isLoading: false,
     totalCount: 1,
     
     getData: async () => {
        try {
            set({isLoading: true})
            const response = await stock.get_stock()
            console.log(response)
            if(response.status === 200){
                response.data.data.stocks.forEach((item: any, index: number) => {
                    item.index = index + 1
                    // setDataCookie("stock_id", response.data.data.stocks.id)
                })
                set({
                    // totalCount: Math.ceil(response.data.data.count / params.limit),
                    data: response?.data?.data.stocks
                })
                set({ data: response?.data?.data.stocks })

            }
            set({isLoading: false})

        } catch (error) {
            console.log(error)
        }
     },

     createData: async (data) => { 
        try {
            const response = await stock.create_stock(data)
            console.log(response)
            if(response.status === 201){
                set((state) => ({ data: [...state.data, response.data] }))
                return response?.status
            }

        } catch (error) {
            Notification({title: 'Error creating category', type: "warning"})
        }
     },

     deleteData: async (id) => {
        try {
            const response = await stock.delete_stock(id)
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

     updateData: async (data,id) => {
        try {
            const response = await stock.update_stock(id,data)
            console.log(response)
            if(response.status === 200){
                Notification({title: "Successfully updated", type: "default"})
                set((state) => ({ data: state.data.filter((item) => item.id!== id)}))
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            }
        } catch (error) {
            console.log(error);
            Notification({title: "Ereoe updating stock", type: "warning"})
        }
     },
     


     
}))

export default useStockStore;