// import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CategoryIcon from '@mui/icons-material/Category';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import ShowChartIcon from '@mui/icons-material/ShowChart';








interface Route {
    path: string;
    content: string;
    icon: React.ReactElement;
}

const routes: Route[] = [
    // {
    //     path: "/main",
    //     content: "Asosiy",
    //     icon: <DashboardCustomizeRoundedIcon/>,
    // },
    {

        path: "/main",
        content: "Brands",
        icon: <EventNoteIcon/>,
    },

    {
        path: "/main/products",
        content: "Products",
        icon: <EngineeringIcon/>,
    },
    {
        path: "/main/category",
        content: "Category",
        icon: <CategoryIcon/>,
    },
    {
        path: "/main/brand_category",
        content: "Brand-Category",
        icon: <BrandingWatermarkIcon/>,
    },
    {
        path: "/main/stock",
        content: "Stock",
        icon: <ShowChartIcon/>,
    },
]

export default routes;