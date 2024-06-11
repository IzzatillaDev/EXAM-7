import { useEffect, useState } from "react"
import useProductsStore from "../../store/products"
import Products from "../../components/modals/products"
import Search from "../../components/ui/search"
import { useLocation } from "react-router-dom"
import GlobalTable from "../../components/ui/table"
import GlobalPagination from "../../components/ui/pagination"





const index = () => {
  const location = useLocation()
  const [item, setItem] = useState(null)
  const [modal, setModal] = useState(false)
  // const [search] = useState()
  const [products, setProducts] = useState([])
  const { get_products_Data, dataas,deleteData,totalCount } = useProductsStore()
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: ""
  })

  useEffect(() => {
    get_products_Data(params)
  }, [get_products_Data, params])

  const headers = [
    { title: "T/R", value: "index" },
    { title: "Name", value: "name" },
    { title: "Action", value: "action" }
  ]

  const changeState = (item: any) => {
    const result: any = [...products, { ...item }]
    setProducts(result)
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

  const changePage = (value:number) => {
    setParams(prevParams => ({
      ...prevParams,
      page: value
    }))
  }

  dataas.forEach((item, index) => {
    item.index =
      params.page * params.limit -
      (params.limit - 1) +
      index;
  })
  return (
    <>
      <div className="">
        {modal && <Products open={modal} handleClose={handleClose} changeState={changeState} item={item} />}
        <div className="flex items-center justify-between">
          <div>
            <Search />
          </div>
          <div className="">
            <button onClick={() => setModal(true)} className="btn ">Add Category</button>
          </div>
        </div>
        <div className="mt-2">
          <GlobalTable headers={headers} body={dataas} deleteItem={deleteData} editItem={editItem} />
        </div>
        <GlobalPagination totalCount={totalCount} page={params.page} setParams={changePage} />
      </div>
    </>
  )
}

export default index