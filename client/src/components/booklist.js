import { useEffect, useState } from "react";
import { Typography, Card, Grid, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { requireAuth } from "../helpers/verifyauth";
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const BookList = () => {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  const loadBooks = async () => {
    const response = await fetch(`/books`);
    const data = await response.json();
    console.log(data);
    setBooks(data);
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`/books/${id}`, {
            method: "DELETE",
          });
          setBooks(books.filter((book) => book.id != id));
          Swal.fire(
            'Deleted!',
            'Libro eliminado.',
            'success'
          );
        }
      });
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    //if not login redirect to login page
    requireAuth(navigate);
    loadBooks();
  }, []);

  return (
    <>
      <h1>Book List</h1>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {books.map((book) => (
          <Grid item xs={4} key={book.id}>
            <Card
              style={{
                marginBottom: "1rem",
                backgroundColor: "#f9f9f9",
              }}
            >
              <CardContent>
                <h2>{book.title}</h2>
                <Typography>Autor: <strong>{book.author}</strong></Typography>
                <Typography>Año de publicación: <strong>{book.publish_year}</strong></Typography>
                <Typography>Género: <strong>{book.genre}</strong></Typography>
                <br />
                <Button
                  variant="contained"
                  style={{ marginRight: "1rem" }}
                  color="primary"
                  onClick={() => {
                    navigate(`/books/${book.id}/edit`);
                  }}
                >
                  <EditIcon />
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    handleDelete(book.id);
                  }}
                >
                <DeleteIcon />
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BookList;
