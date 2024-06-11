import { useEffect, useState } from "react"
import useBrandsStore from "../../store/brand"
import GlobalTable from "../../components/ui/table"
// import { Button } from "@mui/material"
import Brands from "../../components/modals/brands"
import Search from "../../components/ui/search"
// import SingleBrands from "../../components/modals/singlebrand"
import "./style.scss"
import { useLocation } from "react-router-dom"


const index = () => {
  const location = useLocation()
  const { get_brand_Data, datas, isLoading, deleteData } = useBrandsStore()
   const [brands, setBrands] = useState([])
  const [search] = useState()
  const [modal, setModal] = useState(false)
  const [item, setItem] = useState(null)
  const [params,setParams] = useState({
    limit:20,
    page:2,
    search: ""
  })

  useEffect(() => {
    get_brand_Data(params)
  }, [get_brand_Data,params,search])
  // console.log(data)

  const headers = [
    { title: "T/R", value: "index" },
    { title: "brand name", value: "name" },
    { title: "brand description", value: "description" },
    { title: "Action", value: "action" }
  ]

  const changeState = (item: any) => {
    const result: any = [...brands, { ...item }]
    setBrands(result)
  }

  const editItem = (item: any) => {
    setModal(true)
    setItem(item)
  }

  const handleClose = () => {
    setModal(false)
    setItem(null)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const input_search = params.get("search")
    const find = input_search ? input_search : ""
    const page = params.get("page")
    const pageNumber = page ? parseInt(page) : 1
    setParams(prevParams => ({
      ...prevParams,
      page: pageNumber,
      search: find
    }))
  }, [location.search])



  return (
    <div className="">
      {modal && <Brands open={modal} handleClose={handleClose} changeState={changeState} item={item} />}
      <div className="flex items-center justify-between">
      <div>
        <Search />
      </div>
      <div className="">
        <button onClick={() => setModal(true)} className="btn ">Add Brand</button>
      </div>
      </div>
      <div className="mt-2">
        <GlobalTable headers={headers} body={datas} isLoading={isLoading} deleteItem={deleteData} editItem={editItem} />
      </div>
    </div>
  )
}

export default index