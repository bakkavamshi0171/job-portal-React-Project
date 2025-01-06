import React from 'react';
import { Container, Box, Typography, TextField, Button, Card, CardContent } from '@mui/material';

// Contact Us Page Component
export const ContactUs = () => {
  return (
    <div style={{width:"100vw", backgroundColor:"rgb(2, 73, 108)", height:"100vh", color:"white"}}>
    <Container maxWidth="md" style={{ paddingTop:"50px", marginBottom: '50px', }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
      </Typography>
      <Card style={{ padding: '20px', marginTop: '20px' }}>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Subject"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={4}
              variant="outlined"
            />
            <Button variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
    </div>
  );
};
