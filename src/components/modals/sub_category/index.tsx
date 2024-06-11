import { ErrorMessage, Field, Form, Formik } from "formik"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Typegraphy from "@mui/material/Typography"
import TextField from "@mui/material/TextField";
// import { Button } from "@mui/material"
import { validationCreateCategory } from "../../../utils/validation"
import useSubCategoryStore from "../../../store/single_category";
import { createSubCategory } from "../../../interfaces/single-category";
import Notification from "../../../utils/notification";
import { ToastContainer } from "react-toastify";
// import { useEffect } from "react";
import { ModalProps } from "../../../interfaces/global";
// import "./style.scss"
import { useParams } from "react-router-dom";

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

    const { createData,updateData } = useSubCategoryStore()
    const {id} = useParams()
    const initialValues: createSubCategory = {
        name: item?.name || "",
        parent_category_id: id || ""
    };
    console.log(item)

    const handleSubmit = async (values: createSubCategory) => {
        const nevDataBrand = {
            ...values,
            parent_category_id: Number(values.parent_category_id)
        }
        if (!item) {
            const status = await createData(nevDataBrand)
            if (status === 201) {
                Notification({ title: "Sub_Category created successfully", type: "default" })
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
            await updateData(item.id,nevDataBrand)


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
                        validationSchema={validationCreateCategory}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="bg-white p-[46px] w-[500px] mx-auto mt-[130px]">
                                <div className="text-bold text-center uppercase">Sub_Category</div>
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

                                {/* <Field
                                    name="parent_category_id"
                                    type="text"
                                    as={TextField}
                                    label="Enter the category id"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    bgcolor="white"
                                    helperText={
                                        <ErrorMessage
                                            name="parent_category_id"
                                            component="p"
                                            className="text-[red] text-[15px]"
                                        />
                                    }
                                /> */}
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