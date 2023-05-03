import { BookApiModel } from "../models/BookApiModel";

export class BookController extends BookApiModel {
  async buyBook(id) {
    const existedBook = await this.getOneBook(id);
    const purchasedBook = { ...existedBook, status: "Purchased" };
    await this.updateBook(id, purchasedBook);
  }
}
