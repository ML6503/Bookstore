import { useEffect, useState } from 'react';
import { Book } from "./Book";

const Filter = ({  toSortBy  }) => {
    
    return (
        <>
            <h6 className="text-primary">Sort books by:</h6>
            <div className="btn-group" role="group" aria-label="outlined design books filters">
                <button type="button" onClick={toSortBy} className="btn btn-outline-primary">title</button>
                <button type="button" onClick={toSortBy} className="btn btn-outline-primary" >year</button>
                <button type="button" onClick={toSortBy}  className="btn btn-outline-primary">price</button>
            </div>
        </>
        );
};

const BooksList = ({ books, refreshBooks, appController }) => {
    return books && (
        <div
            className="container-fluid d-flex justify-content-around align-items-start flex-wrap pt-5"
            style={{ height: "100vh" }}
        >

            {books.map((book) => {

                return (
                    <Book
                        key={book.id}
                        book={book}
                        refreshBooks={refreshBooks}
                        appController={appController} 
                    />
                )
            })}
        </div>
    );
};

export const Bookstore = ({ appController }) => {
    const [books, setBooks] = useState([]);
    const [sortedBooks, setSortedBooks] = useState(books);

    useEffect(() => {
        refreshBooks();
    }, []);

    useEffect(() => {
        
        setBooks(initialBooks => sortedBooks !== initialBooks ? sortedBooks : initialBooks);
    }, [sortedBooks]);

    const toSortBy = async (e) => {
        e.preventDefault();
        console.log('sort event ', e.currentTarget.textContent);
        const sortedValue = e.currentTarget.textContent;
        // const sortedBooks = books.sort((item1, item2) => item1.name.localeCompare(item2.name));
        const sortedBooks = await appController.getSortedBooks(sortedValue);
        setSortedBooks(sortedBooks);
      
    };

    const refreshBooks = async () => {
        const AVAILABLE = "Available";

        let newBooks = await appController.getAllBooks();
        let availableBooks = newBooks.filter((book) => book.status === AVAILABLE);       
        setBooks(availableBooks);
    };
 
    return books.length !== null ? (
        <div className="container-fluid d-flex flex-column   align-items-start">
            <Filter toSortBy={ toSortBy } /> 
            <BooksList books={books} refreshBooks={refreshBooks} appController={appController} />
        </div>
    ) : (
        <main>Loading...</main>
    );
};

