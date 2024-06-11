import { ErrorMessage, Field, Form, Formik } from "formik"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Typegraphy from "@mui/material/Typography"
import TextField from "@mui/material/TextField";
// import { Button } from "@mui/material"
import { CreateBrandCategory } from "../../../interfaces/brand_category"
import { validationCreateBrandCategory } from "../../../utils/validation"
import Notification from "../../../utils/notification";
import { ToastContainer } from "react-toastify";
// import useCategoryStore from "../../../store/category";
// import { useEffect } from "react";
import { ModalProps } from "../../../interfaces/global";
import useBrandsStore from "../../../store/brand";
import useBrandCategoryStore from "../../../store/brand_category";
import "./style.scss"
import { useEffect, useState } from "react";
// import { number } from "yup";
// import { number } from "yup";

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

    const [params] = useState({
        limit: 20,
        page: 2,
        search: ""
    })

    const initialValues: CreateBrandCategory = {
        name: item?.name || "",
        brand_id: item?.brand_id || "",
    };


    const { get_brand_Data, datas } = useBrandsStore()
    const {createData,updateData} = useBrandCategoryStore()


    useEffect(() => {
        get_brand_Data(params)
    }, [get_brand_Data])
    // console.log(data)

    const handleSubmit = async (values: CreateBrandCategory) => {
        const nevDataBrand = {...values, brand_id: Number(values.brand_id)}
        if (!item) {
            const status = await createData(nevDataBrand)
            if (status === 201) {
                Notification({ title: "Category created successfully", type: "default" })
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
            await updateData( item.id ,nevDataBrand)


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
                        validationSchema={validationCreateBrandCategory}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="bg-white p-[46px] w-[500px] mx-auto mt-[130px]">
                                <div className="text-bold text-center uppercase">Brand-Category</div>
                                <Field
                                    name="name"
                                    type="text"
                                    as={TextField}
                                    label="Enter the category name"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    bgcolor="white"
                                    helperText={
                                        <ErrorMessage
                                            name="name"
                                            component="p"
                                            className="text-[red] text-[15px]"
                                        />
                                    }
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