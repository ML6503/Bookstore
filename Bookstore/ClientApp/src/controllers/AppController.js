import { BookController } from './BookController';

export class AppController {
     
    constructor() {
        this.bookController = new BookController();
    }

    async getBook(id) {
        return await this.bookController.getMovie(id);
    }

    async getAllBooks() {
        return await this.bookController.getAllBooks();
    }
    
    async buyBook(id) {
        return await this.bookController.buyBook(id);
    }
    
    async addBook(id) {
        return await this.bookController.buyBook(id);
    }
}