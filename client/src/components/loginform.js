import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  Button,
  CardContent,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const [login, setLogin] = useState({
        email: "",
        password: "",
      });
  
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  fetch ("http://localhost:4000/login", {
     method: "POST",
     body: JSON.stringify(login),
     headers: { "Content-Type": "application/json" },
})
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    if(result.token === "success"){
      //alert("You are logged in.");
      navigate("books/list");
     } else {
         alert("Please check your login information.");
     }
  });
    setLoading(false);     
  };

  const handleChange = (e) =>
    setLogin({ ...login, [e.target.name]: e.target.value });

  return (
    <Grid
    container
    direction="column"
    alignItems="center"
    justifyContent="center"> 
      <Grid item xs={6}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#fff",
            padding: "1rem",
    
          }}
        >
          <Typography>
            Login
        </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField 
                  variant="outlined"
                  label="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  sx={{
                    display: "block",
                    margin: "1rem 0",
                  }}
                />
                <TextField
                  variant="outlined"
                  name="password"
                  label="Contraseña"
                  type="password"
                  onChange={handleChange}
                  sx={{
                    display: "block",
                    margin: "1rem 0",
                  }}
                />
                
                <Button variant="contained" type="submit"
                disabled={!login.email || !login.password}>
                {loading ? (
                    <CircularProgress color="inherit" size={24} />
                ) : (
                    "Entrar"
                )}
                </Button>
                <br /><br />
                <Link style={{color: "blue" }} to="/users/new">
                                Deseo Registrarme
                            </Link>


              </form>
            </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
