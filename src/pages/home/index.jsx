import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

export function HomePage() {

    const navigate = useNavigate();

    const handleMetaphorsButton = () => {
        navigate("/metaphors");
    }

    const handleAllButton = () => {
        navigate("/all");
    }

    return (
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl" sx={{ height: "100vh" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Box>
                <Typography variant="h1" sx={{marginX: '20px', marginY: '40px'}}>Sinhala Metaphor Store</Typography>
                <Typography variant="h2" sx={{margin: '20px'}}>
                  Search Poems and Metaphors by Sinhalese Poets
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={handleAllButton}
                  sx={{ margin: '20px'}}
                >
                  All
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  color="secondary"
                  onClick={handleMetaphorsButton}
                  sx={{ margin: '20px'}}
                >
                  Metaphors
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
}
