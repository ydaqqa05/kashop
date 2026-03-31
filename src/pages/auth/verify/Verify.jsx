import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from "react-router-dom";
import LeftSide from '../../../components/authSide/LeftSide';
import useForgetPassword from '../../../hooks/useForgetPassword'
import { forgetPasswordSchema } from '../../../validation/ForgetPasswordSchema'

export default function ForgetPassword() {
  const location=useLocation()
  const email =location.state?.email || localStorage.getItem("email");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate=useNavigate();
  const inputRefs = useRef([]);
const [time,setTime]=useState(90)
 
const handleSubmitForm = () => {
  const code = otp.join("");
localStorage.setItem("otp",code)
  if (code.length === 4 && !otp.includes("")) {
    navigate("/resetpassword",{
      state:{code,email}
    });
  }
};

  const minutes = Math.floor(time / 60);
const seconds = time % 60;
const resendOTP=()=>{
  setTime(90)
};
useEffect(() => {
  console.log(otp.join(""));
  if (time <= 0) return;

  const interval = setInterval(() => {
    setTime((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [time]);
  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} minHeight="100vh">
      
      <LeftSide />

      
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ background: '#f9fafb',textAlign:'center' }}
      >
        <Box width="100%" maxWidth={420} px={3}>

         
          <Typography
            variant="h4"
            fontWeight="bold"

            sx={{ mb: 1, color: '#111827' }}
          >
            Verfy Code
          </Typography>

        
          <Typography
            variant="body2"
            sx={{ mb: 4, color: '#6b7280', lineHeight: 1.6,fontSize:"16px"}}
          >
            Enter the 6-digit code sent to your email
          </Typography>

       
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitForm();
            }}
          >
            <Box
      display="flex"
      justifyContent="center"
      gap={2}
    >
      {[...Array(4)].map((_, index) => (
        <TextField
          key={index}
          value={otp[index]}
          variant="outlined"
          onKeyDown={(e) => {
           if(e.key==="ArrowLeft" && index>0)
           {
            inputRefs.current[index-1].focus();
           }
           else if(e.key==="ArrowRight" && index<3)
            {
             inputRefs.current[index+1].focus();
            }
            if (e.key === "Backspace") {
              const newOtp=[...otp];
               if(otp[index]){
                newOtp[index]=""
                setOtp(newOtp)
              }
              else if ( index > 0) {
                inputRefs.current[index - 1].focus();
              }
              
             
            }
          }}
          inputRef={(el)=>(inputRefs.current[index]=el)}
          onChange={(e) => {
             if (!/^[0-9]?$/.test(e.target.value)) return;
            const newOtp = [...otp];
            newOtp[index] = e.target.value;
            setOtp(newOtp);
           
            if (e.target.value && index < 3) {
              inputRefs.current[index + 1].focus();
            }
          }}
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: "center",
              fontSize: "20px",
              width: "50px",
              height: "50px",
            },
          }}
        />
      ))}
    </Box>
  
<Typography
            variant="body2"
            sx={{ mb: 4, color: '#6b7280', lineHeight: 1.6,fontSize:"16px"}}
          >
            Didn't receive the code?
            <Button
  onClick={resendOTP}
  disabled={time > 0}
  sx={{
    fontWeight: 600,
    color: time > 0 ? '#9ca3af' : '#FF5630',
    textTransform: 'none'
  }}
>
  
  <Box component="span" sx={{ fontWeight: 'bold',color:time>0 ?'#000':'red'}}>
   Resend{" "} {minutes < 10 ? `0${minutes}` : minutes}:
    {seconds < 10 ? `0${seconds}` : seconds}
  </Box>
</Button>
          </Typography>
            <Button
              type="submit"
              fullWidth

              sx={{
                py: 1.6,
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1rem',
                color: '#fff',

                background: 'linear-gradient(90deg, #111827, #1f2937)',
                textTransform: 'none',

                '&:hover': {
                  background: 'linear-gradient(90deg, #000000, #111827)',
                },
              }}
            >
             Verify
            </Button>

          </Box>
        </Box>
      </Box>
    </Box>
  )
}