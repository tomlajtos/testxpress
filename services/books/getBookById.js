// use bookData as import reference since books.json has a books prop with an arr (of book objs) as value
// books would work as well then we would reference it as books.books in our function below
// bookData.books looks a bit better semantically
import bookData from "../../data/books.json" assert { type: "json" };

const getBookById = (id) => {
  return bookData.books.find((book) => book.id === id);
};

export default getBookById;
