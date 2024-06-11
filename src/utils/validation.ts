import * as  Yup from 'yup';

export const validationLogin = Yup.object().shape({
  phone_number: Yup.string().required("Phone number is required"),
  password: Yup.string().min(6, "Password must be least 6 characters").required("Password must be at least 6 characters and contain at least one uppercase and one lowercase letter")
})

export const validationRegister = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone_number: Yup.string().required("Phone number is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().min(6, "Password must be least 7 characters").required("Password is required"),
})

export const validationCreateCategory = Yup.object().shape({
  name: Yup.string().required("Category name is required"),
  // parent_category_id: Yup.string().required("Parent Category Id is required"),
})

export const validationCreateBrand = Yup.object().shape({
  name: Yup.string().required("Brand name is required"),
  description: Yup.string().required("Brand name is required"),
})

export const validationCreateBrandCategory = Yup.object().shape({
  name: Yup.string().required("Category name is required"),
  // parent_category_id: Yup.string().required("Parent Category Id is required"),
})

export const validationCreateStock = Yup.object().shape({
  category_id: Yup.string().required("Category Id is required"),
  brand_id: Yup.string().required("Brand Id is required"),
  product_id: Yup.string().required("Product Id is required"),
  quantity: Yup.string().required("Quantity is required"),
})

