import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useAppContext } from "../../providers/AppProvider";
import { useNavigate } from "react-router-dom";

/**
 * DashboardContent Component
 * @returns {React.JSX.Element} - Dashboard with logout functionality
 */
const DashboardContent = () => {
  const { language } = useAppContext();
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Button
        onClick={() => navigate("/logout")}
        variant="contained"
        color="secondary"
      >
        {language?.dashboard?.logoutButtonText || "Logout"}
      </Button>
    </Container>
  );
};

/**
 * DashboardContent propTypes
 */
DashboardContent.propTypes = {};

export default DashboardContent;
