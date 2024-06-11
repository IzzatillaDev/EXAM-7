import { useEffect, useState } from "react"
import useStockStore from "../../store/stock"
import Search from "../../components/ui/search"
import GlobalTable from "../../components/ui/table"
import { useLocation, useNavigate } from "react-router-dom"
import Stock from "../../components/modals/stock"
// import Pagination from "@mui/material/Pagination"
// import { Stack } from "@mui/material"




const index = () => {
  const navigate =  useNavigate()
  const location = useLocation()
  const [item, setItem] = useState(null)
  const [modal, setModal] = useState(false)
  const { getData, data, deleteData, totalCount } = useStockStore()
  const [stock, setStock] = useState([])
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
    search: ""
  })

  // const {id} = useParams()



  useEffect(() => {
    getData()
  }, [getData])

  const headers = [
    { title: "T/R", value: "index" },
    { title: "Id", value: "id" },
    { title: "Quantity", value: "quantity" },
    { title: "Action", value: "action" }
  ]


  const changeState = (item: any) => {
    const result: any = [...stock, { ...item }]
    setStock(result)
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
  //       page: pageNumber,
  //     search: find
  //     // ...prevParams,
  //   }))
  // }, [location.search])


  console.log(data)
  return (
    <>
      <div className="">
        {modal && <Stock open={modal} handleClose={handleClose} item={item} />}
        <div className="flex items-center justify-between">
          <div>
            <Search />
          </div>
          <div className="">
            <button onClick={() => setModal(true)} className="btn ">Add Stock</button>
          </div>
        </div>
        <div className="mt-2">
          <GlobalTable headers={headers} body={data} deleteItem={deleteData} editItem={editItem} />
        </div>
        {/* <Stack spacing={2}>
          <Pagination count={totalCount} page={params.page} onChange={handleChange} />
        </Stack> */}
        {/* <GlobalPagination totalCount={totalCount} page={params.page} setParams={changePage} /> */}
      </div>
    </>
  )
}

export default index