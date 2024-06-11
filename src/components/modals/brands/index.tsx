import { ErrorMessage, Field, Form, Formik } from "formik"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField";
// import { Button } from "@mui/material"
import { CreateBrand } from "../../../interfaces/brands"
import { validationCreateBrand } from "../../../utils/validation"
import { ToastContainer } from "react-toastify";
import useBrandsStore from "../../../store/brand";
// import { useEffect } from "react";
import { ModalProps } from "../../../interfaces/global";
// import { useState } from "react";
import "./style.scss"
import useCategoryStore from "../../../store/category";
import { useEffect, useState } from "react";
import Notification from "../../../utils/notification";
// import { useState } from "react";

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

const Index = ({ open, handleClose, item }: IModalProp) => {
    console.log(item)
    const { getData, data } = useCategoryStore()
    const { createData, updateData } = useBrandsStore()
    const [params] = useState({
        limit:20,
        page:2,
        search: ""
      })
    const initialValues: CreateBrand = {
        name: item?.name || "",
        description: item?.description || "",
        category_id: item?.category_id || "",
        file:  undefined,
    };

    useEffect(() => {
        getData(params)
    }, [getData,params])

    const handleSubmit = async (values: CreateBrand) => {
        // console.log(values.name)
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("category_id", values.category_id);
        if (values.file) {
            formData.append("file", values.file);
        }

        if (!item) {
            const status = await createData(formData)
            if (status === 201) {
                Notification({ title: "Brand created successfully", type: "default" })
                setTimeout(() => {
                    handleClose()
                }, 2000);
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            } else {
                Notification({ title: "Something went wrong", type: "warning" })
            }
        } else {
            await updateData(formData, item.id)
        }
    };

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
                <Box sx={style}>
                    <Typography
                        id="keep-mounted-modal-title"
                        className="text-center"
                        variant="h6"
                        component="h2"
                        color={"white"}
                    >
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationCreateBrand}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue, isSubmitting }) => (
                            <Form className="bg-white p-[46px] w-[500px] mx-auto mt-[20px]">
                                <div className="text-bold text-center uppercase">Brand</div>
                                <Field
                                    name="name"
                                    type="text"
                                    as={TextField}
                                    label="Enter the name"
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
                                    name="description"
                                    type="text"
                                    as={TextField}
                                    label="Enter the brand description"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    bgcolor="white"
                                    helperText={
                                        <ErrorMessage
                                            name="description"
                                            component="p"
                                            className="text-[red] text-[15px]"
                                        />
                                    }
                                />
                                <Field
                                    as="select"
                                    name="category_id"
                                    className="w-full mb-3 border py-3 rounded-md"
                                >
                                    <option>Select Category</option>
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

                                <input
                                    name="file"
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue("file", event.target.files[0]);
                                    }}
                                    className="w-full mb-3 border py-3 rounded-md"
                                />
                                <ErrorMessage
                                    name="file"
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

export default Index;
