import React from "react";
import { AppBar, Box, Toolbar, Typography, Container, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Container>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            <Link style={{ textDecoration: "none", color: "#eee" }} to="/">
                                uLibrary
                            </Link>
                        </Typography>
                        <Button variant="contained" onClick={() => navigate("book/new")}>
                            New Book
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box >
    );
}

export default NavBar;