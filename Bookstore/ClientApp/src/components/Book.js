// import "./styles.css";

export const Book = ({ book, refreshBooks, appController }) => {
    const toBuyBook = async (e) => {
 
        e.preventDefault();
        await appController.buyBook(book.id);
        await refreshBooks();
    };

    return (

            <section className="p-3" >
                <div
                    className="card"
                    style={{
                        maxWidth: `15rem`,
                        minWidth: `12rem`,
                        height: `29rem`,
                        // minHeight: "15rem",
                        // maxHeight: "15rem",
                        // height: "15rem"
                    }}
                >
                    <div className="card-body d-flex flex-row ">
                        <div>
                            <h4 className="card-title font-weight-bold mb-2">
                                {book.name}
                            </h4>
                            <p className="card-text">
                                by: {book.author}
                            </p>
                        </div>
                    </div>
                    <div
                        className="bg-image hover-overlay ripple rounded-0"
                        data-mdb-ripple-color="light"
                    >
                        <img
                            className="img-fluid"                        
                            src="./book-img.jpg"
                            alt="Adventure fantasy book picture"
                        />

                        {/* <a href="#!">
              <div
                className="mask"
                style={{ backgroundColor: ` rgba(251, 251, 251, 0.15)` }}
              ></div>
            </a> */}
                    </div>
                    <div className="card-body">
                    <h5 className="card-title font-weight-bold ">{book.price}$</h5>
                    <p className="card-text">
                        publication year: {book.publicationYear}
                    </p>
                        <p style={{ fontSize: "1.2 rem" }}>
                            {book.Description
                                ? book.Description
                                : "This nice book hasn't got any description yet"}
                        </p>
                        <div>
                            <button onClick={toBuyBook} className="btn btn-primary px-4 ">
                                BUY
                            </button>
                        </div>
                    </div>
                </div>
            </section>

    );
};
