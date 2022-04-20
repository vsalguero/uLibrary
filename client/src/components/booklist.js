import { useEffect, useState } from "react";
import { Typography, Card, Grid, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { requireAuth } from "../helpers/verifyauth";
import Swal from 'sweetalert2';

const BookList = () => {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  const loadBooks = async () => {
    const response = await fetch("http://localhost:4000/books");
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
          fetch(`http://localhost:4000/books/${id}`, {
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
                <Typography>Título: {book.title}</Typography>
                <Typography>Autor: {book.author}</Typography>
                <Typography>Año de publicación: {book.publish_year}</Typography>
                <Typography>Género: {book.genre}</Typography>
                <br />
                <Button
                  variant="contained"
                  style={{ marginRight: "1rem" }}
                  color="inherit"
                  onClick={() => {
                    navigate(`/books/${book.id}/edit`);
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    handleDelete(book.id);
                  }}
                >
                  Eliminar
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
