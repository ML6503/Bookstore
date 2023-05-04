import { useEffect, useState } from 'react';
import { Filter } from "./Filter";
import { BooksList } from "./BooksList";

export const Bookstore = ({ appController }) => {
    const [books, setBooks] = useState([]);
    const [sortedBooks, setSortedBooks] = useState(books);

    // to load books from db and sort for availabilty
    // we load all since purchased will be needed further for admin panel TODO
    const refreshBooks = async () => {
        const AVAILABLE = "Available";

        let newBooks = await appController.getAllBooks();
        let availableBooks = newBooks.filter((book) => book.status === AVAILABLE);
        setBooks(availableBooks);
    };

    // to initially load Books list element by  1st page render  or refresh for navigation 
    useEffect(() => {
        refreshBooks();
    }, []);

    // to renew Books list element by  books props
    useEffect(() => {
        
        setBooks(initialBooks => sortedBooks !== initialBooks ? sortedBooks : initialBooks);
    }, [sortedBooks]);

    // func to cort books by any params choosen on click
    //api request goes to server
    const toSortBy = async (e) => {
        e.preventDefault();
        console.log('sort event ', e.currentTarget.textContent);
        const sortedValue = e.currentTarget.textContent;
        // as option sorting can be done at client if shop is not big to save connection to server and db
        // const sortedBooks = books.sort((item1, item2) => item1.name.localeCompare(item2.name));
        const sortedBooks = await appController.getSortedBooks(sortedValue);
        setSortedBooks(sortedBooks);
      
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

