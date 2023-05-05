import { BookController } from "./BookController";

export class AppController {
    constructor() {
       
    this.bookController = new BookController();
  }

  async getBook(id) {
    return await this.bookController.getOneBook(id);
  }

  async getAllBooks() {
    return await this.bookController.getAllBooks();
  }

    async getSortedBooks(sortBy, order) {
        return await this.bookController.getSortedBooks(sortBy, order);
    }

  async buyBook(id) {
    return await this.bookController.buyBook(id);
  }

  async addBook(book) {
    return await this.bookController.addNewBook(book);
  }

  async deleteBook(id) {
    return await this.bookController.deleteBook(id);
  }
}
