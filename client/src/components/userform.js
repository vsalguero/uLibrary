import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  Button,
  CardContent,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const UserForm = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const params = useParams();

  const loadUser = async (id) => {
    const result = await fetch(`/users/${id}`);
    const data = await result.json();
    setUser({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      role: data.role,
    });
    setEditing(true);
    console.log(data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      loadUser(params.id);
    }
  }, [params.id]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editing) {
      //update the data
      await fetch(`/users/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      Swal.fire(
        'Correcto!',
        'El usuario ha sido modificado!',
        'success'
      )
      setLoading(false);
      navigate("/users/list");
    } else {
      //create a new User
      const res = await fetch(`/register`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        console.log(response.status);
        if (response.status === 400) {
          setLoading(false); 
          Swal.fire(
            'Ooops!',
            'Ya existe un usuario con ese correo electrónico registrado',
            'error'
          )
          throw new Error("Unauthorized");
        }    
        Swal.fire(
          'Éxito!',
          'Usuario creado correctamente!',
          'success'
        )
      });
      setLoading(false);
      navigate("/");
    }
  };

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#fff",
            padding: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>{editing ? "Edit User" : "Create User"}</h1>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                label="First Name"
                name="first_name"
                value={user.first_name}
                onChange={handleChange}
                sx={{
                  display: "block",
                  margin: "1rem 0",
                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                name="last_name"
                label="Last Name"
                value={user.last_name}
                onChange={handleChange}
                sx={{
                  display: "block",
                  margin: "1rem 0",
                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                name="email"
                type="email"
                label="Email"
                value={user.email}
                onChange={handleChange}
                sx={{
                  display: "block",
                  margin: "1rem 0",
                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                name="password"
                label="Password"
                type="password"
                value={user.password}
                onChange={handleChange}
                sx={{
                  display: "block",
                  margin: "1rem 0",
                }}
              />
              {!editing ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  onChange={handleChange}
                  sx={{
                    display: "block",
                    margin: "1rem 0",
                  }}
                />
              ) : (
                ""
              )}
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="role">
                  Role
                </InputLabel>
                <NativeSelect
                  value={user.role}
                  onChange={handleChange}
                  inputProps={{
                    name: "role",
                    id: "role",
                  }}
                >
                  <option value={"Librarian"}>Librarian</option>
                  <option value={"Student"}>Student</option>
                </NativeSelect>
              </FormControl>
              <br />
              <br />

              <Button
                variant="contained"
                type="submit"
                disabled={
                  !user.first_name ||
                  !user.last_name ||
                  !user.email ||
                  !user.password
                }
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserForm;
