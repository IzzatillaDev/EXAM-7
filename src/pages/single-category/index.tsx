import { useEffect, useState } from "react"
import useSubCategoryStore from "../../store/single_category"
import { useParams } from "react-router-dom"
import GlobalTable from "../../components/ui/table"
import Search from "../../components/ui/search"
import SubCategory from "../../components/modals/sub_category"



const index = () => {
  const { getData, data,deleteData } = useSubCategoryStore()
  const [modal, setModal] = useState(false)
  const [item, setItem] = useState(null)
  const [sub_category, setSubCategory] = useState([])

  const { id } = useParams()

  const [params, setParams] = useState({
    parent_category_id: id,
    limit: 10,
    page: 1,
    search: ""
  })

  useEffect(() => {
    getData(params)
  }, [getData, params])


  const headers = [
    { title: "T/R", value: "index" },
    { title: "Name", value: "name" },
    { title: "Action", value: "action" }
  ]

  const changeState = (item: any) => {
    const result: any = [...sub_category, { ...item }]
    setSubCategory(result)
  }

  const editItem = (item: any) => {
    setModal(true)
    setItem(item)
  }

  const handleClose = () => {
    setModal(false)
    setItem(null)
  }

  return (
    <>
      <div className="">
        {modal && <SubCategory open={modal} handleClose={handleClose} changeState={changeState} item={item}/>}
        <div className="flex items-center justify-between">
          <div>
            <Search />
          </div>
          <div className="">
            <button onClick={() => setModal(true)} className="btn ">Add Sub Category</button>
          </div>
        </div>
        <div className="mt-2">
          <GlobalTable headers={headers} body={data} deleteItem={deleteData} editItem={editItem}/>
        </div>
        {/* <GlobalPagination totalCount={totalCount} page={params.page} setParams={changePage} /> */}
      </div>
    </>
  )
}

export default index