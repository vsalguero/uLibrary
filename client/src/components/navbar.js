import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  //logout function
  const logout = async () => {
    let result = await fetch(`/logout`,
      {
        method: "GET",
        headers: {
          "Authorization": "Baerer " + sessionStorage.getItem('jwtToken')
        }
      }).then(
        sessionStorage.removeItem("jwtToken")
      ).then(
        navigate("/")
      )
    result = await result.json()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                uLibrary
              </Link>
            </Typography>
            {sessionStorage.getItem('jwtToken') &&
              <Button
                variant="contained"
                onClick={() => navigate("books/new")}
                disableElevation
              >
                New Book
              </Button>
            }
            {sessionStorage.getItem('jwtToken') &&
              <Button
                variant="contained"
                onClick={() => navigate("books/list")}
                disableElevation
              >
                Books
              </Button>
            }
            {sessionStorage.getItem('jwtToken') &&
              <Button
                variant="contained"
                onClick={() => navigate("users/new")}
                disableElevation
              >
                New user
              </Button>
            }
            {sessionStorage.getItem('jwtToken') &&
              <Button
                variant="contained"
                onClick={logout}
                disableElevation
              >
                LOGOUT
              </Button>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
