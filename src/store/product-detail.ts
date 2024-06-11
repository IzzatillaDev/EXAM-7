// import { create } from "zustand"
// import { ProductDetail } from "../interfaces/product-detail"
// import product_detail from "../service/product-detail"
// // import Notification from "../utils/notification"
// // import { setDataCookie } from "../utils/data-service"


// const useProductDetailStore = create<ProductDetail>((set) => ({
//     data: [],
//     isLoading: false,
//     totalCount: 1,

//     getData: async (id) => {
//         try {
//             set({ isLoading: true })
//             const respons = await product_detail.get_product_detail(id)
//             //    console.log(respons)
//             if (respons.status === 200) {
//                 set({ productsId: respons?.data?.data })
//             }
//             set({ isLoading: false })
//         } catch (error) {
//             console.log(error)
//             set({ isLoading: false })
//         }
//     },


//     // createData: async (data) => {
//     //     try {
//     //         const response = await products.create_products(data)
//     //         console.log(response)
//     //         if (response.status === 201) {
//     //             set((state) => ({ dataas: [...state.dataas, response.data.data] }))
//     //             return response.status
//     //         }

//     //     } catch (error) {
//     //         Notification({ title: 'Error creating category', type: "warning" })
//     //     }
//     // },

//     // deleteData: async (id) => {
//     //     try {
//     //         const response = await products.delete_products(id)
//     //         console.log(response)
//     //         if (response.status === 200) {
//     //             Notification({ title: "successfully deleted", type: "default" })
//     //             set((state) => ({ dataas: state.dataas.filter((item) => item.id !== id) }))
//     //             setTimeout(() => {
//     //                 window.location.reload()
//     //             }, 1500);

//     //         }
//     //     } catch (error) {
//     //         Notification({ title: "failed to delete", type: "error" })
//     //     }
//     // },

//     // updateData: async (data, id) => {
//     //     // console.log("updateData");
//     //     try {
//     //         const response = await products.update_products(id, data)
//     //         console.log(response)
//     //         if (response.status === 200) {
//     //             Notification({ title: "successfully updated", type: "default" })
//     //             set((state) => ({ dataas: state.dataas.filter((item) => item.id !== id) }))
//     //             setTimeout(() => {
//     //                 window.location.reload()
//     //             }, 1500);
//     //         }
//     //     } catch (error) {
//     //         console.log(error);
//     //         Notification({ title: "erroreeeeee updating category", type: "warning" })
//     //     }
//     // },




// }))

// export default useProductDetailStore;