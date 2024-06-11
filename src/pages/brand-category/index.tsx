import { useLocation } from "react-router-dom"
import useBrandCategoryStore from "../../store/brand_category"
import { useEffect, useState } from "react"
// import { Pagination,Stack } from "@mui/material"
import Search from "../../components/ui/search"
import GlobalTable from "../../components/ui/table"
import GlobalPagination from "../../components/ui/pagination"
import BrandCategory from "../../components/modals/brand_category"
// import useBrandCategoryStore from "../../store/brand_category"


const index = () => {
  const location = useLocation()
  const [search] = useState()
  const [brand_category, setBrandCategory] = useState([])
  const [item, setItem] = useState(null)
  const [modal, setModal] = useState(false)
  const { get_brand_category_Data, datass,deleteData,totalCount } = useBrandCategoryStore()

  const [params, setParams] = useState({
    limit: 10,
    page: 1,
    search: ""
  })

  useEffect(() => {
    get_brand_category_Data(params)
  }, [get_brand_category_Data, params])

  const headers = [
    { title: "T/R", value: "index" },
    { title: "Name", value: "name" },
    { title: "Action", value: "action" }
  ]

  const changeState = (item: any) => {
    const result: any = [...brand_category, { ...item }]
    setBrandCategory(result)
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

  // const changePage = (value: number) => {
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

  datass.forEach((item, index) => {
    item.index =
      params.page * params.limit -
      (params.limit - 1) +
      index;
  })

  return (
    <>
      <div className="">
        {modal && <BrandCategory open={modal} handleClose={handleClose} changeState={changeState} item={item} />}
        <div className="flex items-center justify-between">
          <div>
            <Search />
          </div>
          <div className="">
            <button onClick={() => setModal(true)} className="btn ">Add Brand Category</button>
          </div>
        </div>
        <div className="mt-2">
          <GlobalTable headers={headers} body={datass} deleteItem={deleteData} editItem={editItem} />
        </div>
        <GlobalPagination totalCount={totalCount} page={params.page} setParams={changePage}/>
      </div>


    </>
  )
}

export default index