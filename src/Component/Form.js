import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import "moment/locale/en-gb"; // or your preferred locale
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useSearchParams } from "react-router-dom";
// import dayjs from "dayjs";

function VendorForm({ onSubmit }) {
  const [vendorName, setVendorName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    if (email) setEmail(email);
    if (name) setVendorName(name);
  }, [searchParams]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const mail = {
      vendorName,
      email,
      selectedDate: selectedDate ? selectedDate.format("MMMM YYYY") : null,
    };

    onSubmit(mail);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Vendor Name"
              fullWidth
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Month"
                views={["year", "month"]}
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<MailOutlineIcon />}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default VendorForm;
