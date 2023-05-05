
import React, { useReducer } from "react";

export const AddBook = ({ appController  }) => {

    const initialValue = {
        name: "",
        author: "",
        publicationYear: "",
        price: "",
        status: true,
    };

    function reducer(state, action) {
        switch (action.type) {
            case "setName":
                return {
                    ...state,
                    name: action.value,
                };
            case "setAuthor":
                return {
                    ...state,
                   author: action.value,
                };
            case "setPublicationYear":
                return {
                    ...state,
                    publicationYear: action.value,
                };
            case "setPrice":
                return {
                    ...state,
                    price: action.value,
                };
            case "setStatus":
                return {
                    ...state,
                    status: !state.status,
                };
            case "reset":
                return initialValue;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialValue);

    return (
        <div className="p-5">
            <form method="post"
                onSubmit={(event) => {
                    console.log("Submitted! with details: ", state);
                    appController.addBook(state);
                    event.preventDefault();
                    dispatch({ type: "reset" });
                }}
            >
            {/*-- Book name  input --*/}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="bookTitle" >Book Title</label>
                    <input type="text" id="bookTitle" className="form-control" name="name"
                        onChange={(event) => {
                         event.preventDefault();
                         event.stopPropagation();
                         dispatch({ type: "setName", value: event.target.value });
                        }}
                        placeholder="Enter book name"
                        value={state.name}
                        required />
               
            </div>

            {/*-- Book Author input --*/}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="bookAuthor" > Book Author</label>
                    <input type="text" id="bookAuthor" className="form-control" placeholder="Enter full name"
                        name="author"
                        onChange={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            dispatch({ type: "setAuthor", value: event.target.value });
                        }}
                        value={state.author}
                        required />
                    
            </div>

            {/*-- Book Publishing Year input --*/}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="bookYear" >Book Publication Year</label>
                    <input type="number" min="1800" max="2099" step="1" id="bookYear" className="form-control"
                        placeholder="Enter year of publication"
                        name="publicationYear"
                        onChange={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            dispatch({ type: "setPublicationYear", value: event.target.value });
                        }}
                        value={state.publicationYear}
                        required  />
                    
            </div>

            {/*-- Book price input --*/}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="bookPrice"  >Book Price</label>
                    <input type="number" min="0.00" max="10000.00" step="any" id="bookPrice" className="form-control"
                        name="price"
                        onChange={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            dispatch({ type: "setPrice", value: event.target.value });
                        }}
                        placeholder="Enter price in USD"
                        value={ state.price}
                        required />
               
            </div>

                    
            <div className="row mb-4">
                <div className="col d-flex justify-content-start">
                   <p  className="ps-1 pe-3 font-bold">Book Status:</p>
                    <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="availableCheck"
                                name="status"
                                onChange={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    dispatch({ type: "setStatus", value: event.target.value });
                                }}
                                   required
                                // checked={state.status}
                                checked
                            />
                        <label className="form-check-label" htmlFor="availableCheck"> Available </label>
                    </div>
                </div>

                <div className="col">
                   
                </div>
            </div>

           
            <button type="submit" className="btn btn-primary btn-block mt-2 px-4">Add Book</button>
            </form>
        </div>
    );
};