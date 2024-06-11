import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationProps } from "../../../interfaces/global"
import { useLocation, useNavigate } from 'react-router-dom';


const GlobalPagination = (props: PaginationProps) => {
    const location = useLocation()
    const navigate = useNavigate()
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        props.setParams(value)
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("page", `${value}`)
        navigate(`?${searchParams}`)

    }
    return (
        <>
            <Stack spacing={2}>
                <Pagination count={props.totalCount} page={props.page} onChange={handleChange} />
            </Stack>
        </>
    )
}

export default GlobalPagination