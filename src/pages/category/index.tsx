import { useEffect, useState } from "react"
import useCategoryStore from "../../store/category"
// import { Button } from "@mui/material"
import Category from "../../components/modals/category"
import GlobalTable from "../../components/ui/table"
import Search from "../../components/ui/search"
import "./style.scss"
import { useLocation } from "react-router-dom"
import GlobalPagination from "../../components/ui/pagination"


const index = () => {
  const location = useLocation()
  const { getData, data, isLoading, deleteData,totalCount } = useCategoryStore()
  const [category, setCategory] = useState([])
  const [item, setItem] = useState(null)
  const [search] = useState()
  const [modal, setModal] = useState(false)
  const [params,setParams] = useState({
    limit:10,
    page:1,
    search: ""
  })


  useEffect(() => {
    getData(params)
  }, [getData,search,params])

  


  const headers = [
    { title: "T/R", value: "index" },
    { title: "Name", value: "name" },
    { title: "Action", value: "action" }
  ]



  const changeState = (item: any) => {
    const result: any = [...category, { ...item }]
    setCategory(result)
  }

  const editItem = (item: any) => {
    setModal(true)
    setItem(item)
  }

  const handleClose = () => {
    setModal(false)
    setItem(null)
  }

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search)
  //   const input_search = params.get("search")
  //   const find = input_search ? input_search : ""
  //   const page = params.get("page")
  //   const pageNumber = page ? parseInt(page) : 1
  //   setParams(prevParams => ({
  //     ...prevParams,
  //     page: pageNumber,
  //     search: find
  //   }))
  // }, [location.search])

  // const changePage = (value:number) => {
  //   setParams(prevParams => ({
  //     ...prevParams,
  //     page: value
  //   }))
  // }

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

  const changePage = (value:number) => {
    setParams(prevParams => ({
      ...prevParams,
      page: value
    }))
  }

  data.forEach((item, index) => {
    item.index =
      params.page * params.limit -
      (params.limit - 1) +
      index;
  })
  return (
    <>
      <div className="">
        {modal && <Category open={modal} handleClose={handleClose} changeState={changeState} item={item} />}
        <div className="flex items-center justify-between">
        <div>
        <Search />
      </div>
        <div className="">
           <button onClick={() => setModal(true)}  className="btn ">Add Category</button>
        </div>
        </div>
        <div className="mt-2">
          <GlobalTable headers={headers} body={data} isLoading={isLoading} editItem={editItem} deleteItem={deleteData} />
        </div>
        <GlobalPagination totalCount={totalCount}  page={params.page} setParams={changePage}/>
      </div>
      

    </>
  )
}

export default index