import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const getTheme=(mode)=>{
    return createTheme({
    
    palette:{
        mode:mode,
       
    }
})
}
export default getTheme