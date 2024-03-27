//NOTE:
// the following concepts are not addressed in this point, but at a later stage of the module:
// - request body validation
// - resource protection i.e. rate limiting (discussed in lessons about middleware)
// - adding persistent data storage

import express from "express";
import getBooks from "./services/books/getBooks.js"; //! use the file extension
import getBookById from "./services/books/getBookById.js";
import createBook from "./services/books/createBook.js";
import updateBookById from "./services/books/updateBookById.js";
import deleteBook from "./services/books/deleteBook.js";

const app = express();
// needed for the express app to parse incomming JSON in the request body
// (i.e. in post requests), it's a built in middleware function
app.use(express.json());

app.get("/", (req, res) => {
  const html = `<html><h1>Welcome to the Express Bookstore</h1> 
     <p>This is a test app to learn back-end programming with Express.js</p></html>`;
  res.send(html);
});

app.get("/books", (req, res) => {
  // only simple error handling since we're not dealing with
  // since we are not dealing with specific parameters (i.e. IDs etc.)
  try {
    const { genre, available } = req.query;
    const books = getBooks(genre, available);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while getting the list of books!");
  }
});

app.get("/books/:id", (req, res) => {
  try {
    const { id } = req.params;
    const book = getBookById(id);

    if (!book) {
      res.status(404).send(`Book with id ${id} was not found!`);
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting the book by id!");
  }
});

app.post("/books", (req, res) => {
  try {
    const { title, author, isbn, pages, available, genre } = req.body;
    const newBook = createBook(title, author, isbn, pages, available, genre);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while creating the new book!");
  }
});

app.put("/books/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, pages, available, genre } = req.body;
    const updatedBook = updateBookById(
      id,
      title,
      author,
      isbn,
      pages,
      available,
      genre,
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while updating the book by id!");
  }
});

app.delete("/books/:id", (req, res) => {
  try {
    const { id } = req.params;
    const deletedBookId = deleteBook(id);

    if (!deletedBookId) {
      res.status(404).send(`Book with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `The book with id ${id} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    console.log("id of book to be deleted:", id);
    res.status(500).send("Something went wrong while deleting book by id!");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port :3000");
});
