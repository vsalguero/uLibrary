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
import { useNavigate, useParams } from "react-router-dom";

const BookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publish_year: "",
    genre: "",
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const params = useParams();

  const loadBook = async (id) => {
    const result = await fetch(`http://localhost:4000/books/${id}`);
    const data = await result.json();
    setBook({
      title: data.title,
      author: data.author,
      publish_year: data.publish_year,
      genre: data.genre,
    });
    setEditing(true);
    console.log(data);
  };

  useEffect(() => {
    if (params.id) {
      loadBook(params.id);
    }
  }, [params.id]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editing) {
        //update the data
      await fetch(`http://localhost:4000/books/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(book),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });    
      setLoading(false);
      navigate("/");
    } else {
        //create a new book
      const res = await fetch("http://localhost:4000/books", {
        method: "POST",
        body: JSON.stringify(book),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setLoading(false);
      navigate("/");
    }     
  };

  const handleChange = (e) =>
    setBook({ ...book, [e.target.name]: e.target.value });

  return (
    <Grid
      container
      direction="column"
      
      spacing={2}
    >
      <Grid item xs={12}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#fff",
            padding: "1rem",
            alignItems:"center",
      justifyContent:"center"
    
          }}
        >
          <Typography>
            {editing ? 'Edit Book' : 'Create Book'}
        </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField 
                  fullWidth
                  variant="outlined"
                  label="Title of the book"
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  sx={{
                    display: "block",
                    margin: "1rem 0",
                  }}
                />
                <TextField
                fullWidth
                  variant="outlined"
                  name="author"
                  label="Author name"
                  value={book.author}
                  onChange={handleChange}
                  sx={{
                    display: "block",
                    margin: "1rem 0",
                  }}
                />
                <TextField
                fullWidth
                  variant="outlined"
                  name="publish_year"
                  label="Year of publish"
                  value={book.publish_year}
                  onChange={handleChange}
                  sx={{
                    display: "block",
                    margin: "1rem 0",
                  }}
                />
                <TextField
                fullWidth
                  variant="outlined"
                  name="genre"
                  label="Genre"
                  value={book.genre}
                  onChange={handleChange}
                  sx={{
                    display: "block",
                    margin: "1rem 0",
                  }}
                />
                <Button variant="contained" type="submit"
                disabled={!book.title || !book.author}>
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

export default BookForm;
