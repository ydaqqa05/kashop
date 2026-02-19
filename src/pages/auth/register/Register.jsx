import {Box,Button,TextField,Typography,Checkbox,FormControlLabel,InputAdornment,IconButton, CircularProgress,} from "@mui/material";
  import { Visibility, VisibilityOff } from "@mui/icons-material";
  import axios from "axios";
  import React, { useState } from "react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { registerSchema } from "../../../validation/RegisterSchema";
  import sofa from "../../../assets/image/sofa.webp";
  import { Link } from "react-router-dom";
  
  export default function Register() {
    const[serverErrors,setServerErrors]=useState([]);
    const [showPassword, setShowPassword] = useState(false);
  
    const {register,handleSubmit,formState: { errors,isSubmitting },} = useForm({
      resolver: yupResolver(registerSchema),mode:'onBlur'
    });
  
    const registerForm = async (values) => {
      try {
        console.log(values);
        const response = await axios.post(`https://knowledgeshop.runasp.net/api/auth/Account/Register`,values);
        console.log(response);
      } catch (error) {
setServerErrors(error.response.data.errors)
      }
    };
  
    return (
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} minHeight="100vh">
        <Box flex={1} display="flex" position={'relative'}>
        <Typography variant="h6" fontWeight="bold" mb={4} position={'absolute'} left={'50%'} >  3legant.  </Typography>
          <Box component="img" src={sofa} alt="sofa"
            sx={{ width: "100%",height: "100vh",objectFit: "cover",}}/>
        </Box>
        <Box flex={1} display="flex" justifyContent="center" alignItems="center"p={4}>
          <Box width="100%" maxWidth={400}>
     
            <Typography variant="h4" fontWeight="bold">Sign up</Typography>
            {serverErrors?.length > 0 && (
              <Box mt={2} color={'red'}>
                {serverErrors.map((err)=><Typography>
                  {err}
                </Typography>)}
              </Box>
            )}
            <Typography variant="body2" mt={1} mb={3}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#4caf50", textDecoration: "none" }}> Sign in </Link>

            </Typography>
  
            <Box component="form" display="flex" flexDirection="column" gap={3}
              onSubmit={handleSubmit(registerForm)}>
              <TextField {...register("fullName")} label="Your name" variant="standard" fullWidth
                error={errors.fullName} helperText={errors.fullName?.message}/>
  
              <TextField {...register("userName")} label="Username" variant="standard" fullWidth
                error={errors.userName} helperText={errors.userName?.message}/>
  
              <TextField {...register("email")} label="Email address" variant="standard" fullWidth
                error={errors.email} helperText={errors.email?.message} />
              
              <TextField {...register("password")} label="Password" type={showPassword ? "text" : "password"}
                variant="standard" fullWidth error={errors.password}
                helperText={errors.password?.message}
                InputProps={{endAdornment: (<InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Visibility /> : <VisibilityOff /> }</IconButton> </InputAdornment>
                  ),
                }}
              />
              <TextField {...register("phoneNumber")} label="Phone number" variant="standard"
  fullWidth error={errors.phoneNumber}
  helperText={errors.phoneNumber?.message}
/>
              <FormControlLabel control={<Checkbox />} 
              label={ <Typography variant="body2"> I agree with <b>Privacy Policy</b> and <b>Terms of Use</b>
                  </Typography>}/>
              <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#111", py: 1.5,
              borderRadius: 2,"&:hover": { backgroundColor: "#000",},}} disabled={isSubmitting}> {isSubmitting ? <CircularProgress/>:'Sign In' }</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }