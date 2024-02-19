import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../apiService";
import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToReadingList } from "../service/favoriteList/favoriteListSlice";
import { BACKEND_API } from "../config";

const BookDetailPage = () => {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const params = useParams();
  const bookId = params.id;
  const dispatch = useDispatch();

  // Get a book based on its id param
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/books/${bookId}`);
        setBook(res.data);
      } catch (error) {
        toast.error(error.message, {autoClose: 1500});
      }
      setLoading(false);
    };
    fetchData();
  }, [bookId]);

  return (
    <Container>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {book && (
              <img
                width="100%"
                src={`${BACKEND_API}/${book.imageLink}`}
                alt={book.title}
              />
            )}
          </Grid>
          <Grid item md={8}>
            {book && (
              <Stack>
                <h2>{book.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {book.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {book.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {book.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {book.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {book.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => dispatch(addToReadingList(book))}
                >
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
