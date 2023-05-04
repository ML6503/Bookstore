import { useEffect, useState } from 'react';
import { Book } from "./Book";

export const Bookstore = ({ appController }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        refreshBooks();
    }, []);

    const refreshBooks = async () => {
     
        let newBooks = await appController.getAllBooks();
        let availableBooks = newBooks.filter((book) => book.status === "Available");       
        setBooks(availableBooks);
    };
    console.log('books from state ', books );
    return books.length !== null ? (
        <div
            className="container-fluid d-flex justify-content-around align-items-center flex-wrap"
            style={{ width: "100vw", height: "100vh" }}
        >
            {books.map((book) => {
                console.log('book', book);
                return (
                    <Book
                        key={ book.id }
                        book={book}
                        refreshBooks={refreshBooks}
                        appController={appController}
                    />
                )
})}
        </div>
    ) : (
        <main>Loading...</main>
    );
};

