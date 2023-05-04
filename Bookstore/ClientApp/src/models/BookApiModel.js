import { ApiConfig } from "../api/ApiConfig";

export class BookApiModel extends ApiConfig {
  async getAllBooks() {
    //const resp = await fetch("api/books");
      const { data } = await this.host.get("api/books");
      console.log('resp axios get from BookApiModel: ', data);
    //const books = await resp.json().catch((err) => console.error("Error", err));
    //  console.log('books from BookApiModel: ', books);
    return data;
  }

  async getOneBook(id) {
    const resp = await this.host.get(`api/books/${id}`);
    const book = await resp.json().catch((err) => console.error("Error", err));

    return book;
  }

  async addBook(newBook) {
    const resp = await this.host.post(`api/books`, newBook);
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
