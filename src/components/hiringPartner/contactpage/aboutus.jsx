import React from "react";
import { Container, Box, Typography, Card, CardContent } from "@mui/material";

export const AboutUs = () => {
  return (
    <div
      style={{
        width: "100vw",
        backgroundColor: "rgb(2, 73, 108)",
        height: "100vh",
        color: "white",
      }}
    >
      <Container
        maxWidth="md"
        style={{ paddingTop: "50px", marginBottom: "50px" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Welcome to our Job Portal! We are committed to connecting job seekers
          with employers in the most efficient way possible.
        </Typography>
        <Card style={{ padding: "20px", marginTop: "20px" }}>
          <CardContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h6" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body2" paragraph>
                Our mission is to bridge the gap between talented individuals
                and companies looking for the best candidates. We strive to make
                the hiring process smooth, transparent, and effective.
              </Typography>
              <Typography variant="h6" gutterBottom>
                Why Choose Us?
              </Typography>
              <Typography variant="body2" paragraph>
                - Easy-to-use platform for job seekers and employers.
                <br />
                - Advanced search filters to find the perfect match.
                <br />- Dedicated support team to assist you at every step.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};
