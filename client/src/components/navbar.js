import React from "react";
import { AppBar, Box, Toolbar, Typography, Container, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
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
                        <Button 
                         variant="contained"
                         onClick={() => navigate("books/new")}
                         disableElevation>
                            New Book
                        </Button>
                        <Button 
                         variant="contained"
                         onClick={() => navigate("books/list")}
                         disableElevation>
                            List of Books
                        </Button>
                        <Button 
                        variant="contained" 
                        onClick={() => navigate("users/new")}
                        disableElevation>
                            New user
                        </Button>
                        <Button 
                        variant="contained" 
                        onClick={() => navigate("users/list")}
                        disableElevation>
                            User List
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box >
    );
}

export default NavBar;