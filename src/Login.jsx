/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { Container, Box, Typography, Link, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";

const FbLogin = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load the Facebook SDK script
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "230031713162674", // Replace with your Facebook app ID
        cookie: true,
        xfbml: true,
        version: "v20.0", // Use the correct API version
      });

      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const responseFacebook = (response) => {
    console.log(response);
    setUserData(response);
  };

  return (
    <Container
      maxWidth="lg"
      style={{ display: "flex", minHeight: "100vh", alignItems: "center" }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
          <FacebookIcon color="primary" style={{ fontSize: 100 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Facebook
          </Typography>
          <Typography variant="h6" component="p">
            Facebook helps you connect and share with the people in your life.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 4,
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              bgcolor: "background.paper",
            }}
          >
            {!userData ? (
              <Box textAlign="center">
                <FacebookLogin
                  appId="230031713162674" // Replace with your Facebook app ID
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  icon="fa-facebook"
                />
              </Box>
            ) : (
              <Box textAlign="center">
                <Typography variant="h6">Welcome, {userData.name}</Typography>
                <img src={userData.picture.data.url} alt={userData.name} />
                <Typography variant="body1">{userData.email}</Typography>
              </Box>
            )}
          </Box>
          <Box mt={4} textAlign="center">
            <Link href="#" variant="body2">
              Create a Page
            </Link>{" "}
            for a celebrity, brand or business.
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FbLogin;
