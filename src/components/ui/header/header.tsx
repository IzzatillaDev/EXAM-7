import { AppBar, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
// import IconButton from '@mui/material/IconButton';
import AccountMenu from "../menu"
import { IconButton } from "@mui/material"
import "./style.scss"





const drawerWidth = 240;
interface ModalProps {
    handleDrawerToggle: () => void;
}
const Header = ({ handleDrawerToggle }: ModalProps) => {

    return (
        <>
            {/* <CssBaseline /> */}
            <AppBar
                // className="body"
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: "white"
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex">
                            <Typography className="img" variant="h6" noWrap component="div">
                                TexnoArt Shop
                            </Typography>
                            {/* <img className="w-[30px] h-[30px]" src={Korzina} alt="" /> */}
                            <img className="w-[30px] h-[30px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr1MjIJbJVvGX73UUawJ-KIwWljWA4Uy-dzQ&s" alt="" />
                        </div>

                      
                        
                        <div className="flex">
                        <AccountMenu />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header