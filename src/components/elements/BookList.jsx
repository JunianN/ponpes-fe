import masonryStyles from "@/styles/masonry.module.css";
import { Box } from "@chakra-ui/react";
import clsx from "clsx";
import Masonry from "react-masonry-css";
import BookCard from "./BookCard";

const BookList = ({ error, isLoading, books, onOpen, setBookOpened }) => {
  const onCardClick = (book) => {
    onOpen();
    setBookOpened(book);
  };
  return (
    <Box mt={4} mx="-8px">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}

      <Masonry
        breakpointCols={{ default: 4, 480: 1, 768: 2, 992: 3 }}
        className={clsx(masonryStyles["masonry-grid"])}
        columnClassName={clsx(masonryStyles["masonry-grid-column"])}
      >
        {books?.map((book) => (
          <BookCard
            book={book}
            onClick={() => onCardClick(book)}
            key={book._id}
          />
        ))}
      </Masonry>
    </Box>
  );
};

export default BookList;
