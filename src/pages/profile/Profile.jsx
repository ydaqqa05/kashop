import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import useProfile from "../../hooks/useProfile";
import Footer1 from "../../components/footer/Footer1";
import Footer2 from "../../components/footer/Footer2";
import useForgetPassword from "../../hooks/useForgetPassword";
import { useNavigate } from "react-router-dom";
import useChangePassword from "../../hooks/useChangePassword";
import useChangeEmail from "../../hooks/useEmailPassword";

function TabPanel({ children, value, index }) {
  return value === index && <Box sx={{ mt: 3 }}>{children}</Box>;
}

export default function MyAccount() {
  const [tab, setTab] = useState(0);
  const { data, isLoading } = useProfile();
  const { mutate: changePassword } = useChangePassword();
  const { mutate: changeEmail } = useChangeEmail();
  const { mutate: sendCode } = useForgetPassword();
  const navigate = useNavigate();

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
    setForm({ ...form, [e.target.name]: e.target.value });
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
      changeEmail(form.email);
    }

    if (form.newPassword) {
      sendCode(form.email, {
        onSuccess: () => {
          changePassword({
            CurrentPassword: form.oldPassword,
            NewPassword: form.newPassword,
            ConfirmNewPassword: form.confirmPassword,
          });
        },
      });
    }
    navigate('/login')
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 5,
          p: { xs: 2, md: 5 },
          bgcolor: "#fff",
          minHeight: "100vh",
        }}
      >
        <Paper
          sx={{
            p: 3,
            width: { xs: "100%", md: 250 },
            textAlign: "center",
            bgcolor: "#6F3F5F7",
          }}
        >
          <Avatar
            src="https://i.pravatar.cc/100"
            sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
          />

          <Typography fontWeight={600}>{data?.fullName}</Typography>

          <Box sx={{ display: { xs: "block", md: "none" }, mt: 3 }}>
            <Select
              fullWidth
              value={tab}
              onChange={(e) => setTab(e.target.value)}
            >
              <MenuItem value={0}>Account</MenuItem>
              <MenuItem value={1}>Address</MenuItem>
              <MenuItem value={2}>Orders</MenuItem>
              <MenuItem value={3}>Log Out</MenuItem>
            </Select>
          </Box>
          <Tabs
            orientation="vertical"
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            sx={{ mt: 3, display: { xs: "none", md: "flex" } }}
          >
            <Tab label="Account" />
            <Tab label="Address" />
            <Tab label="Orders" />
            <Tab label="Log Out" />
          </Tabs>
        </Paper>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            mb={3}
            textAlign="center"
            fontSize={{ xs: "28px", md: "54px" }}
          >
            My Account
          </Typography>
          <TabPanel value={tab} index={0}>
            <Paper sx={{ p: { xs: 2, md: 4 } }}>
              <Typography fontWeight={600} mb={2}>
                Account Details
              </Typography>

              <TextField fullWidth name="firstName" value={form.firstName} onChange={handleChange} label="First Name" sx={{ mb: 2 }} />
              <TextField fullWidth name="lastName" value={form.lastName} onChange={handleChange} label="Last Name" sx={{ mb: 2 }} />
              <TextField fullWidth name="displayName" value={form.displayName} onChange={handleChange} label="Display Name" sx={{ mb: 2 }} />
              <TextField fullWidth name="email" value={form.email} onChange={handleChange} label="Email" sx={{ mb: 2 }} />

              <Typography fontWeight={600} mt={3} mb={2}>
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

              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  bgcolor: "black",
                  mt: 2,
                  width: { xs: "100%", md: "auto" }, 
                }}
              >
                Save Changes
              </Button>
            </Paper>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Paper sx={{ p: { xs: 2, md: 4 } }}>
              <Typography fontWeight={600} mb={2}>
                Address
              </Typography>

              <TextField fullWidth label="Street" sx={{ mb: 2 }} />
              <TextField fullWidth label="City" sx={{ mb: 2 }} />
              <TextField fullWidth label="Country" sx={{ mb: 2 }} />
              <TextField fullWidth label="Zip Code" sx={{ mb: 3 }} />

              <Button variant="contained" sx={{ bgcolor: "black", width: { xs: "100%", md: "auto" } }}>
                Save Address
              </Button>
            </Paper>
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Paper sx={{ p: { xs: 2, md: 4 } }}>
              <Typography fontWeight={600} mb={3}>
                Orders History
              </Typography>

              <Box>
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
          <TabPanel value={tab} index={3}>
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
        localStorage.removeItem("accessToken"); 
        navigate("/login"); 
      }}
    >
      Log Out
    </Button>
  </Paper>
          </TabPanel>
        </Box>
      </Box>

      <Footer1 />
      <Footer2 />
    </>
  );
}