import { useState, useEffect } from "react";
import { Grid, Typography, Card, Button, CardContent, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";

const BookForm = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        publish_year: '',
        genre: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:4000/books', {
            method: 'POST',
            body: JSON.stringify(book),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log(data);
        navigate('/');

    }

    const handleChange = e =>
        setBook({ ...book, [e.target.name]: e.target.value });


    return (
        <Grid container direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={3}>
                <Card
                    sx={{ mt: 5 }}
                    style={{
                        backgroundColor: "#f1f1f1",
                        padding: "1rem",
                    }}>
                    <Typography>
                        Create Book
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    label="Title of the book"
                                    name="title"
                                    onChange={handleChange}
                                    sx={{
                                        display: "block",
                                        margin: "1rem 0"
                                    }} />
                                <TextField
                                    variant="outlined"
                                    name="author"
                                    label="Author name"
                                    onChange={handleChange}
                                    sx={{
                                        display: "block",
                                        margin: "1rem 0"
                                    }} />
                                <TextField
                                    variant="outlined"
                                    name="publish_year"
                                    label="Year of publish"
                                    onChange={handleChange}
                                    sx={{
                                        display: "block",
                                        margin: "1rem 0"
                                    }} />
                                <TextField
                                    variant="outlined"
                                    name="genre"
                                    label="Genre"
                                    onChange={handleChange}
                                    sx={{
                                        display: "block",
                                        margin: "1rem 0"
                                    }} />
                                <Button variant="contained" type="submit">
                                    Save
                                </Button>
                            </form>
                        </CardContent>
                    </Typography>
                </Card>
            </Grid>
        </Grid>
    );
}

export default BookForm;