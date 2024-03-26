import bookData from "../../data/books.json" assert { type: "json" };

const updateBookById = (id, title, author, isbn, pages, available, genre) => {
  const book = bookData.books.find((book) => book.id === id);

  if (!book) {
    throw new Error(`Book with id ${id} was not found!`);
  }
  // nullish coalescing makes sure we preserve the original [key:value]
  // if there is no new [key:value] in the request body
  // this we it is also possible to use PUT instead of PATCH >> flexibility >> less/simpler code
  book.title = title ?? book.title;
  book.author = author ?? book.author;
  book.isbn = isbn ?? book.isbn;
  book.pages = pages ?? book.pages;
  book.available = available ?? book.available;
  book.genre = genre ?? book.genre;

  return book;
};

export default updateBookById;
