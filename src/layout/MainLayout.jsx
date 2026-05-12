import { Box } from "@mui/material";

const MainLayout = ({ children }) => {
    return (
        <Box sx={{
            position:"relative",
            width:"100dvw",
            // height:"100vh",
            height:"100dvh",
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