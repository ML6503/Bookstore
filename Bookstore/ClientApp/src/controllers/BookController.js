import { ApiConfig } from "../api/ApiConfig";

export class BookApiModel extends ApiConfig {
  async getAllBooks() {
    //const resp = await fetch("api/books");
    const resp = await this.host.get("api/books");
    const books = await resp.json().catch((err) => console.error("Error", err));

    return books;
  }

  async getOneBook(id) {
    const resp = await this.host.get(`api/books/${id}`);
    const book = await resp.json().catch((err) => console.error("Error", err));

    return book;
  }

  async addBook(id) {
    const resp = await this.host.post(`api/books/${id}`, newBook);
    const book = await resp.json().catch((err) => console.error("Error", err));
    await this.getAllBooks();
    return book;
  }

  async updateBook(id, updatedBook) {
    const resp = await this.host.put(`api/books/${id}`, updatedBook);
    await resp.json().catch((err) => console.error("Error", err));
    await this.getAllBooks();
  }

  async deleteBook(id) {
    const resp = await this.host.put(`api/books/${id}`);
    await resp.json().catch((err) => console.error("Error", err));
    await this.getAllBooks();
  }
}

export class BookController extends BookApiModel {
    
    async buyBook(id) {
        const existedBook = await this.getOneBook(id);
        const purchasedBook = { ...existedBook, status: "Purchased" };
        await this.updateBook(id, purchasedBook);
    }
}
