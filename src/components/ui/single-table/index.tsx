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
import { SingleTableProps } from "../../../interfaces/global"
import { ToastContainer } from "react-toastify"
import del from "../../../assets/images/btn.svg"
import edit from "../../../assets/images/edit.svg"
import { useNavigate } from "react-router-dom"






const SingleTable = (props: SingleTableProps) => {
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
                                onClick={() =>props.deleteItem(item.id || item?.category_id)}
                              />

                              <img
                                className="w-[60px] h-[25px]"
                                src={edit}
                                alt="edit"
                                onClick={() => props.editItem(item)}
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
export default SingleTable;
