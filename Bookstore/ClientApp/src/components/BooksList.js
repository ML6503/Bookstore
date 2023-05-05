import { Book } from "./Book";

export const BooksList = ({ books, refreshBooks, appController }) => {
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