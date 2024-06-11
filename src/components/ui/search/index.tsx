import { IconButton, InputBase, Paper } from "@mui/material"
import { GridSearchIcon } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const index = () => {
    const [value, setValue] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const handleChange = (event: any) => {
        const search = event.target.value
        console.log(search)
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("search", search)
        navigate(`?${searchParams}`)
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const input_search =  params.get("search")
        const search = input_search ? input_search : ""
        setValue(search)
    },[location.search])
    return (
        <>
            <div className="w-96">
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Qidiruv"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={handleChange}
                        value={value}
                    />
                    <IconButton
                        type="button"
                        sx={{ p: '10px' }}
                        aria-label="search">
                        <GridSearchIcon />
                    </IconButton>
                </Paper>
            </div>
        </>
    )
}

export default index