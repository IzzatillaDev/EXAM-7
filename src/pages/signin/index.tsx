import "./style.scss"
import auth from "../../service/auth"
import { login } from "../../interfaces/auth"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { validationLogin } from "../../utils/validation"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { setDataCookie } from "../../utils/data-service"
import Notification from "../../utils/notification"
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useState } from "react"
import { useMask } from "@react-input/mask"
// import { ref } from "yup"



const index = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const initialValues = {
    phone_number: "",
    password: ""
  }
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },

  })

  const handleSubmit = async (value: login) => {
    let phone = value.phone_number.replace(/\D/g, '')
    let payload = { ...value, phone_number: `+${phone}` }
    try {
      const response = await auth.login(payload)
      if (response.status === 201) {
        setDataCookie("id", response?.data?.data.data.id)
        setDataCookie("token", response?.data?.data.tokens.access_token)
        Notification({ title: "Muvaffaqiyatli tizimga kirildi", type: "default" })
        
        setTimeout(() => {
          navigate("/main")
        }, 1500);
      }
    } catch (error) {
      Notification({ title: "Xatolik bor janob tekshirib ko'ring", type: "error" })
    }
  }
  return (
    <div className="body w-full h-[100vh]">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-6 mx-auto mt-[120px]">
            <div className=""> 
              <h2 className="log">Welcome to Login Page</h2>
            </div>
            <div className="card-footer mt-4">
              <Formik
                initialValues={initialValues}
                validationSchema={validationLogin}
                onSubmit={handleSubmit}
              >
                <Form className="">
                  <div className="">
                    <h2 className="emal">Phone Number</h2>
                    <Field
                    // ={inputRef}
                      name="phone_number"
                      type="tel"
                      placeholder="phone_number"
                      className="form-control my-2"
                      inputRef={inputRef}
                      as={TextField}
                    />
                    <ErrorMessage
                      className="text-danger"
                      component="div"
                      name="phone_number"
                    />
                  </div>

                  <div className="mt-4">
                    <h2 className="emal">Password</h2>
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      className="form-control my-2"
                      as={TextField}
                      helperText={
                        <ErrorMessage
                          className="text-danger"
                          component="div"
                          name="password"
                        />
                      }
                      InputProps={{
                        endAdorment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                 {/* <div className="flex items-center gap-2"> */}
                  {/* <button onClick={() => navigate("/signup")} className="btn bg-blue text-white mt-4 p-2 w-[400px]">Register</button> */}
                 <button className="btn22 text-white mt-4 p-3 w-full">Login</button>
                 <NavLink to={"/signup"}>
                      <h2 className="text-white mt-3 ml-[515px] font-bold">Register</h2>
                 </NavLink>
                 {/* </div> */}
                </Form>

              </Formik>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default index