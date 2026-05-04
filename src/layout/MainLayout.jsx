import { Box } from "@mui/material";

const MainLayout = ({ children }) => {
    return (
        <Box sx={{
            position:"relative",
            width:"100%",
            height:"100vh",
            background:"aqua",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center"
        }}>
            {children}
        </Box>
    );
};


export default MainLayout