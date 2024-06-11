import { Skeleton } from "@mui/material"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import Paper from "@mui/material/Paper"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import TableCell from "@mui/material/TableCell"
import TableSortLabel from "@mui/material/TableSortLabel"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { TableProps } from "../../../interfaces/global"
import EngineeringIcon from '@mui/icons-material/Engineering';
import { ToastContainer } from "react-toastify"
import del from "../../../assets/images/btn.svg"
import edit from "../../../assets/images/edit.svg"
import { useNavigate } from "react-router-dom"






const GlobalTable = (props: TableProps) => {
  const navigate = useNavigate()

  return (
    <>
      <ToastContainer />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TableHead>
                <TableRow>
                  {props.headers?.map((header, index) => (
                    <TableCell key={index}>
                      <TableSortLabel>{header.title}</TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {props.isLoading
                  ? // Render Skeletons while loading
                  Array.from(new Array(5)).map((_, index) => (
                    <TableRow key={index}>
                      {props.headers?.map((_, i) => (
                        <TableCell key={i}>
                          <Skeleton />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                  : props.body?.map((item, index) => (
                    <TableRow key={index}>
                      {props.headers?.map((header, i) => (
                        <TableCell
                          key={i}
                          className={item[header.value]?.class}
                        >
                          {header.value === "action" ? (
                            <div className="flex items-center gap-[10px]">
                              <img
                                className="w-[60px] h-[25px]"
                                src={del}
                                alt="updatePage"
                                onClick={() => props.deleteItem(item.id || item?.category_id)}
                              />

                              <img
                                className="w-[60px] h-[25px]"
                                src={edit}
                                alt="edit"
                                onClick={() => props.editItem(item)}
                              />


                              <img
                                className="w-[60px]"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaAvr6DimySZMmvLLuZrEmV8eKGQoxricfWA&s"
                                alt="edit"
                                onClick={() => navigate(`/main/category/${item.id}`)}
                              />

                              <img
                                className="w-[20px]"
                                alt="edit"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTZiAwXG8l-xpkyLsJW_3QkAphO2kv0SleCQ&s"
                                onClick={() => navigate(`/main/product-detail/${item.id}`)}
                              />

                            </div>
                          ) : item[header.value] ? (
                            item[header.value]
                          ) : (
                            item[header.value]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
};
export default GlobalTable;
