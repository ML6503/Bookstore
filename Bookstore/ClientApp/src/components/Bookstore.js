import { useEffect, useState } from 'react';

export const Bookstore = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (books == null) {
            getDataFromApi();
        }

    }, []);

    function getDataFromApi() {
        fetch(`books`)
            .then((results) => {
                return results.json();
            })
            .then(data => {

                setBooks(data);
            })
    }

    return (
        (books != null) ? <main>
            {books.map(b => <div>{ b.name }</div>) }

        </main> : <main>Loading...</main>
    );
};
