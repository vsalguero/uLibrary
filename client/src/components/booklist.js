import { useEffect, useState } from "react";
import {Typography, Card, CardContent, Button } from '@mui/material';

const BookList = () => {
    const[books, setBooks] = useState([]);

    const loadBooks = async () => {
        const response = await fetch('http://localhost:4000/books');
        const data = await response.json();
        console.log(data)
        setBooks(data);
    };

    useEffect(() =>{
        loadBooks()
    }, []);

    return (
        <>
        <h1>Book List</h1>
        {books.map((book) =>(
            <Card key={book.id}
            style={{
                marginBottom: "1rem",
                backgroundColor: "#f9f9f9"
            }}>
                <CardContent>
                    <Typography>Título: {book.title}</Typography>
                    <Typography>Autor: {book.author}</Typography>
                    <Typography>Año de publicación: {book.publish_year}</Typography>
                    <Typography>Género: {book.genre}</Typography>
                    <br />
                    <Button variant="contained" style={{marginRight: "1rem"}} color="inherit" onClick={() => { console.log("Edit")}}>
                        Editar
                    </Button>
                    <Button variant="contained" color="warning" onClick={() => { console.log("Eliminar")}}>
                        Eliminar
                    </Button>
                </CardContent>

            </Card>
        ))}
        </>
    );
}

export default BookList;