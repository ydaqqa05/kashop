import React, { useEffect, useState } from "react";
import {Box,Tabs,Tab,Typography,TextField,Button,Avatar,Paper,} from "@mui/material";
import useProfile from "../../hooks/useProfile";
import Footer1 from "../../components/footer/Footer1";
import Footer2 from "../../components/footer/Footer2";
import useForgetPassword from "../../hooks/useForgetPassword";
import useResetPassword from "../../hooks/useResetPassword";
import { useNavigate } from "react-router-dom";
import useChangePassword from "../../hooks/useChangePassword";
import useChangeEmail from "../../hooks/useEmailPassword";
import useOrders from "../../hooks/useOrders";

function TabPanel({ children, value, index }) {
  return value === index && <Box sx={{ mt: 3 }}>{children}</Box>;
}

export default function MyAccount() {
  const [tab, setTab] = useState(0);
  const { data, isLoading } = useProfile();
  const { mutate: changePassword, isPending } = useChangePassword();
  const { mutate: changeEmail } = useChangeEmail();
  
  const navigate=useNavigate()
const { mutate: sendCode } = useForgetPassword();

const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  displayName: "",
  email: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};
useEffect(() => {
  if (data) {
    setForm({
      firstName: data.fullName?.split(" ")[0] || "",
      lastName: data.fullName?.split(" ")[1] || "",
      displayName: data.userName || "",
      email: data.email || "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }
}, [data]);
const handleSubmit = () => {
  if (form.newPassword !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  if (form.email !== data.email) {
    changeEmail(form.email, {
      onSuccess: () => {
        alert("Email updated successfully");
      },
      onError: () => {
        alert("Failed to update email");
      },
    });
  }
  if (form.newPassword) {
    sendCode(form.email, {
      onSuccess: () => {
        const code = prompt("Enter code sent to your email");

        changePassword(
          {
            CurrentPassword: form.oldPassword,
            NewPassword: form.newPassword,
            ConfirmNewPassword: form.confirmPassword,
          },
          {
            onSuccess: () => {
              alert("Password changed successfully");
              localStorage.removeItem("accessToken");
              navigate("/login");
            },
            onError: () => {
              alert("Failed to change password");
            },
          }
        );
      },
    });
};
}

  console.log(data)
  return (
    <>
    <Box sx={{ display: "flex", gap: 5, p: 5, bgcolor: "#fff", minHeight: "100vh" }}>
      <Paper sx={{ p: 3, width: 250, textAlign: "center", bgcolor: "#6F3F5F7", maxHeight: "500px" }}>
        <Avatar
          src="https://i.pravatar.cc/100"
          sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
        />
        <Typography fontWeight={600}>{data?.fullName}</Typography>

        <Tabs
          orientation="vertical"
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          sx={{ mt: 3 }}
        >
          <Tab label="Account" />
          <Tab label="Address" />
          <Tab label="Orders" />
          <Tab label="Wishlist" />
          <Tab label="Log Out" />
        </Tabs>
      </Paper>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" mb={3} fontSize={"54px"} fontFamily={"Poppins"} textAlign={'center'}>
          My Account
        </Typography>
        <TabPanel value={tab} index={0}>
          <Paper sx={{ p: 4 }}>
            <Typography fontWeight={600} mb={2} fontSize={"20px"} fontFamily={"Inter"}>
              Account Details
            </Typography>

            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700} >FIRST NAME *</Typography>
              <TextField fullWidth value={form.firstName} required  name="firstName" size="small" placeholder="First name" onChange={handleChange} fontFamily="Inter" sx={{ mb: 2 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>LAST NAME *</Typography>
              <TextField fullWidth value={form.lastName} required name="lastName" size="small" placeholder="Last name" onChange={handleChange} fontFamily="Inter" sx={{ mb: 2 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>Display name *</Typography>
              <TextField fullWidth size="small"  value={form.displayName} required name="displayName" placeholder="Display name" onChange={handleChange} fontFamily="Inter" sx={{ mb: 2 }}/>
            <Typography fontSize={"12px"}  mb={3} fontWeight={"Italic"} fontFamily={"Inter"} color="#6C7275">This will be how your name will be displayed in the account section and in reviews</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>Email *</Typography>
              <TextField fullWidth size="small" value={form.email} required name="email" placeholder="Email" onChange={handleChange} fontFamily="Inter" sx={{ mb: 2 }}/>
            </Box>

            <Typography fontWeight={600} mb={2} fontSize={"20px"} fontFamily={"Inter"}>
              Password
            </Typography>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>Old password</Typography>
              <TextField fullWidth size="small" value={form.oldPassword} required name="oldPassword" placeholder="Old password" onChange={handleChange} fontFamily="Inter" sx={{ mb: 2 }}/>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>New password</Typography>
              <TextField fullWidth size="small" value={form.newPassword} required name="newPassword" placeholder="New password" onChange={handleChange} fontFamily="Inter" sx={{ mb: 2 }}/>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="#6C7275" fontSize={"12px"} fontFamily={"Inter"} fontWeight={700}>Repeat new password</Typography>
              <TextField fullWidth size="small" value={form.confirmPassword} required name="confirmPassword" placeholder="Repeat new password" onChange={handleChange} fontFamily="Inter" sx={{ mb: 2 }}/>
            </Box>

            <Button variant="contained"  onClick={handleSubmit} sx={{ bgcolor: "black",py:"12px",px:"40px",mt:1,borderRadius:2 }} >
              Save changes
            </Button>
          </Paper>
        </TabPanel>

        {/* Address Tab */}
        <TabPanel value={tab} index={1}>
          <Paper sx={{ p: 4 }}>
            <Typography fontWeight={600} mb={2}>
              Address
            </Typography>

            <TextField fullWidth label="Street" sx={{ mb: 2 }} />
            <TextField fullWidth label="City" sx={{ mb: 2 }} />
            <TextField fullWidth label="Country" sx={{ mb: 2 }} />
            <TextField fullWidth label="Zip Code" sx={{ mb: 3 }} />

            <Button variant="contained" sx={{ bgcolor: "black" }}>
              Save Address
            </Button>
          </Paper>
        </TabPanel>
        <TabPanel value={tab} index={2}>
  <Paper sx={{ p: 4 }}>
    <Typography fontWeight={600} mb={3} fontSize={"20px"}>
      Orders History
    </Typography>

    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          pb: 2,
          borderBottom: "1px solid #E8ECEF",
          color: "#6C7275",
          fontWeight: 600,
          fontSize: "14px",
        }}
      >
        <Typography>Number ID</Typography>
        <Typography>Dates</Typography>
        <Typography>Status</Typography>
        <Typography>Price</Typography>
      </Box>

      {isLoading? (
  <Typography>Loading...</Typography>
) : (
  data.orders?.map((order) => {

    const date = new Date(order.orderDate);
    
    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return (
      <Box
        key={order.id}
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          py: 2,
          borderBottom: "1px solid #E8ECEF",
        }}
      >
        <Typography>#{order.id}</Typography>
        <Typography>{formatter.format(date)}</Typography>
        <Typography>{order.status}</Typography>
        <Typography>${order.amountPaid.toFixed(2)}</Typography>
      </Box>
    );
  })
)}
    </Box>
  </Paper>
</TabPanel>
<TabPanel value={tab} index={4}>
  <Paper
    sx={{
      p: 5,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 3,
      bgcolor: "#F5F5F5",
      borderRadius: 2,
    }}
  >
    <Avatar src="https://i.pravatar.cc/100"
      sx={{ width: 80, height: 80, bgcolor: "#6F3F5F7", mb: 2 }}
    >
      🔒
    </Avatar>
    <Typography fontWeight={600} fontSize={22}  >
      Ready to Log Out?
    </Typography>
    <Typography fontSize={14} color="#6C7275">
      Clicking the button below will log you out of your account.
    </Typography>
    <Button
      variant="contained"
      sx={{
        mt: 2,
        bgcolor: "#6F3F5F",
        ":hover": { bgcolor: "#5a3250" },
        py: 1.5,
        px: 5,
        borderRadius: 2,
      }}
      onClick={() => {
        localStorage.removeItem("accessToken"); // إزالة التوكن
        navigate("/login"); // إعادة التوجيه لصفحة تسجيل الدخول
      }}
    >
      Log Out
    </Button>
  </Paper>
</TabPanel>
      </Box>
    </Box>
   <Footer1/>
   <Footer2/>
    </>
  );
}