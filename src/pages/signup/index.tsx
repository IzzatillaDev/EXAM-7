import { Visibility, VisibilityOff } from "@mui/icons-material"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {SignUp} from "../../interfaces/auth"
import { useMask } from "@react-input/mask"
import auth from "../../service/auth"
import { TextField } from "@mui/material"
import {validationRegister} from "../../utils/validation"
import Notification from "../../utils/notification"
import "./style.scss"

const index = () => {
  const [showPassword, setSHowPassword] = useState(false)
  const navigate = useNavigate()

  const initialValues: SignUp = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  }

  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },

  })

  const handleSubmit = async (values: SignUp) => {
    // setEmail(values.email)
    let phone = values.phone_number.replace(/\D/g, '')
    let payload = { ...values, phone_number: `+${phone}` }

    try {
      const response = await auth.sign_up(payload)
      console.log(response);
      if (response.status === 201) {
        // setModal(true)
        Notification({title: "completed successfully", type: "success"})
        setTimeout(() => {
          navigate("/")
        }, 1500);

      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="body w-full h-[100vh]">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-3">
            <div className="mt-6">
              {/* <button onClick={() => setModal(true)}>open modal</button>  */}
              <div className="">
                <h1 className='sign_up'>Welcome To Register Page</h1>
              </div>
              <div className="card-footer">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationRegister}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <div className="pt-2">
                      <h2 className='password'>First Name</h2>
                      <Field
                        name="first_name"
                        type="text"
                        placeholder="first_name"
                        className="form-control my-2"
                        as={TextField}
                      />
                      <ErrorMessage
                        className="text-danger"
                        component="div"
                        name="first_name"
                      />
                    </div>

                    <div className="pt-2">
                      <h2 className="password">Last Name</h2>
                      <Field
                        name="last_name"
                        type="text"
                        placeholder="last_name"
                        className="form-control my-2"
                        // innerRef={inputRef}
                        as={TextField}
                        // inputRef={inputRef}
                      />
                      <ErrorMessage
                        className="text-danger"
                        component="div"
                        name="last_name"
                      />
                    </div>

                    <div className="pt-2">
                      <h2 className="password">Phone Number</h2>
                      <Field
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

                    <div className="pt-2">
                      <h2 className="password">Email</h2>
                      <Field
                        name="email"
                        type="email"
                        placeholder="email"
                        className="form-control my-2"
                        // inputRef={inputRef} 
                        as={TextField}
                      />
                      <ErrorMessage
                        className="text-danger"
                        component="div"
                        name="email"
                      />
                    </div>

                    <div className='relative pt-2' >
                      <h2 className="password">Password</h2>
                      <Field
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        as={TextField}
                        placeholder="password"
                        className="form-control my-2"
                        helperText={
                          <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="password"
                          />
                        }
                      />
                      {showPassword ? <Visibility onClick={() => setSHowPassword(!showPassword)} className='absolute z-10 top-[44px] right-[20px]' />
                        : <VisibilityOff onClick={() => setSHowPassword(!showPassword)} className='absolute z-10 top-[44px] right-[20px]' />}
                    </div>

                    <button type="submit" className="btn22 w-full text-white mt-4 p-3">
                      To Login
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index