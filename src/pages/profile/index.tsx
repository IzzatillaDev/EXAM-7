import { useEffect } from "react"
import { getDataFromCookie } from "../../utils/data-service"
import useAdminStore from "../../store/admin_auth"
import { Navigate, useNavigate } from "react-router-dom"


const index = () => {
  const navigate = useNavigate()
  const id = getDataFromCookie("id")
  const { getData, data } = useAdminStore()
  useEffect(() => {
    getData(id)
  }, [getData])

  console.log(data)

  data.forEach(item => {
    const { id, first_name } = item.data;
    const data2 = []
    data2.push(item.data)
    
    // console.log(`ID: ${id}, First Name: ${first_name}`);
  });
  






  return (
    <>
    {/* {
      data.forEach(item => {
        const response = { last_name, email, password, role, lastUpdateAt, createdAt } = item.data;
        console.log(response)
      })
    } */}
          {/* // console.log(` Phone Number: ${phone_number}, Email: ${email}, Password: ${password}, Role: ${role}, Created_at: ${createdAt}, UpdatedAt: ${lastUpdateAt}` ); */}

          <div className="flex items-center gap-12">
            <div className="mt-[100px]">
              <img className="h-[400px] ml-[60px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" alt="" />
            </div>

            <div className="mt-[92px]">
              <h2 className="text-2xl mt-[12px] font-bold ml-8 p-2">First Name: yusupov</h2>
              <p className="text-2xl mt-[12px] font-bold ml-8 p-2">Phone Number: +998949317188</p>
              <p className="text-2xl mt-[12px] font-bold ml-8 p-2">Email: admin@yusupov.com</p>
              <p className="text-2xl mt-[12px] font-bold ml-8 p-2">Role:  Admin</p>
              <p className="text-2xl mt-[12px] font-bold ml-8 p-2">Created_at: 2024-06-05T06:59:08.955Z</p>
              <p className="text-2xl mt-[12px] font-bold ml-8 p-2">Updated_at: 2024-06-10T23:12:22.431Z</p>
            <div className="ml-[41px] flex items-center gap-[20px] mt-[30px]">
              <button onClick={() => navigate("/signup")} className="font-bold border px-6 py-2 ">Create</button>
              <button className="font-bold border px-6 py-2 ">Delete</button>
              <button className="font-bold border px-6 py-2 ">Update</button>
            </div>
            </div>
          </div>
       
    </>
  )
}

export default index