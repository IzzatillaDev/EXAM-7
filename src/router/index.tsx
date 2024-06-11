import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider

} from "react-router-dom"
import App from "../App"
import { Signin, Main,Brands,Products,Signup,Category,SingleCategory,Profile,BrandCategory,Stock,ProductDeatil} from "@pages"

const index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<App />} />,
      <Route index element={<Signin />} />,
      <Route path="/signup" element={<Signup />} />,
      <Route path="/profile" element={<Profile />} />,
      <Route path="/main/*" element={<Main />}>
        <Route index  element={<Brands />} />,
        <Route path="products"  element={<Products />} />,
        <Route path="category"  element={<Category />} />,
        <Route path="category/:id" element={<SingleCategory />} />,
        <Route path="brand_category"  element={<BrandCategory />} />,
        <Route path="stock"  element={<Stock />} />,
        <Route path="product-detail"  element={<ProductDeatil />} />,
      </Route>,

      <Route />
    ]),
  )
  return <RouterProvider router={router} />;
}

export default index