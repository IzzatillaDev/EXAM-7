import { ErrorMessage, Field, Form, Formik } from "formik"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Typegraphy from "@mui/material/Typography"
import TextField from "@mui/material/TextField";
// import { CreateStock } from "../../../interfaces/stock";
import { validationCreateStock } from "../../../utils/validation";
import Notification from "../../../utils/notification";
import { ToastContainer } from "react-toastify";
import useStockStore from "../../../store/stock";
import { ModalProps } from "../../../interfaces/global";
import useCategoryStore from "../../../store/category";
import useProductsStore from "../../../store/products";
import useBrandsStore from "../../../store/brand";
import { CreateStock } from "../../../interfaces/stock";
import { useEffect, useState } from "react";
import "./style.scss"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 450,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
}

interface IModalProp extends ModalProps {
    changeState: (item: any) => void;
}

const index = ({ open, handleClose, item }: IModalProp) => {
    console.log(item)

    const {createData,updateData} = useStockStore()
    const initialValues: CreateStock = {
        category_id: item?.category_id || "",
        brand_id: item?.brand_id || "",
        product_id: item?.product_id || "",
        quantity: item?.quantity || "",
    };

    const [params] = useState({
        limit: 10,
        page: 1,
        search: ""
    })
    const { getData, data } = useCategoryStore()
    const { get_brand_Data, datas } = useBrandsStore()
    const { get_products_Data, dataas } = useProductsStore()

    useEffect(() => {
        getData(params)
        get_products_Data(params)
        get_brand_Data(params)
    }, [get_products_Data, getData, get_brand_Data, params])



    const handleSubmit = async (values: CreateStock) => {
        console.log(values)
        const nevDataBrand = {
            ...values,
            category_id: Number(values.category_id),
            brand_id: Number(values.brand_id),
            product_id: Number(values.product_id),
            quantity: Number(values.quantity)
        }
        if (!item) {
            const status = await createData(nevDataBrand)
            if (status === 201) {
                Notification({ title: "Stock created successfully", type: "default" })
                setTimeout(() => {
                    handleClose()
                }, 1500);
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
        } else {
            Notification({ title: "Somethin went error", type: "error" })
        }
        } else {
            await updateData(nevDataBrand, item.id)


        }

    }

    return (
        <>
            <ToastContainer />
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={{ style }}>
                    <Typegraphy
                        id="keep-mounted-modal-title"
                        className="text-center"
                        variant="h6"
                        component="h2"
                        color={"white"}
                    >
                    </Typegraphy>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationCreateStock}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="bg-white p-[46px] w-[500px] mx-auto mt-[130px]">
                                <div className="text-bold text-center uppercase">Stock</div>
                                {/* <Field
                                    as="select"
                                    name="category_id"
                                    className="w-full mb-3 border py-3 rounded-md"
                                >
                                    <option>Select Category Id</option>
                                    {da = ta.map((item) => (
                                        <option
                                            key={item?.id}
                                            value={item?.id}
                                        >
                                            {item?.name}
                                        </option>
                                    ))}
                                </Field>

                                <ErrorMessage
                                    name="category_id"
                                    component="div"
                                    className="text-[#ff3636]"
                                /> */}
                                <Field
                                    as="select"
                                    name="category_id"
                                    className="w-full mb-3 border py-3 rounded-md"
                                >
                                    <option>Select Category Id</option>
                                    {data.map((item) => (
                                        <option
                                            key={item?.id}
                                            value={item?.id}
                                        >
                                            {item?.name}
                                        </option>
                                    ))}
                                </Field>

                                <ErrorMessage
                                    name="category_id"
                                    component="div"
                                    className="text-[#ff3636]"
                                />

                                <Field
                                    as="select"
                                    name="brand_id"
                                    className="w-full mb-3 border py-3 rounded-md"
                                >
                                    <option>Select Brand Id</option>
                                    {datas.map((item) => (
                                        <option
                                            key={item?.id}
                                            value={item?.id}
                                        >
                                            {item?.name}
                                        </option>
                                    ))}
                                </Field>

                                <ErrorMessage
                                    name="brand_id"
                                    component="div"
                                    className="text-[#ff3636]"
                                />

                                <Field
                                    as="select"
                                    name="product_id"
                                    className="w-full mb-3 border py-3 rounded-md"
                                >
                                    <option>Select Product Id</option>
                                    {dataas.map((item) => (
                                        <option
                                            key={item?.id}
                                            value={item?.id}
                                        >
                                            {item?.name}
                                        </option>
                                    ))}
                                </Field>

                                <ErrorMessage
                                    name="product_id"
                                    component="div"
                                    className="text-[#ff3636]"
                                />

                                <Field
                                    name="quantity"
                                    type="text"
                                    as={TextField}
                                    label="Enter the quantity"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    bgcolor="white"
                                    helperText={
                                        <ErrorMessage
                                            name="quantity"
                                            component="p"
                                            className="text-[red] text-[15px]"
                                        />
                                    }
                                />


                                <button disabled={isSubmitting} className="btn w-full">Submit</button>

                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </>
    )
}

export default index;