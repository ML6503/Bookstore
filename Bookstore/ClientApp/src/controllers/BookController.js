import { BookApiModel } from "../models/BookApiModel";

export class BookController extends BookApiModel {
  async buyBook(id) {
    const existedBook = await this.getOneBook(id);
    const purchasedBook = { ...existedBook, status: "Purchased" };
    await this.updateBook(id, purchasedBook);
    }

    async getSortedBooks(sortBy, order = "asc") {     

        return await this.getAllSortedBooks(sortBy, order)
    }
    async addNewBook(bookValue) {
        const book = {
            ...bookValue,
            publicationYear: +bookValue.publicationYear,
            price: +bookValue.price,
            status: bookValue.status ? "Available" : "Purchased",
        };

        return await this.addBook(book);
    }
}
