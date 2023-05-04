import { ApiConfig } from "../api/ApiConfig";

export class BookApiModel extends ApiConfig {
  async getAllBooks() {
    //const resp = await fetch("api/books");
    const { data } = await this.host.get("api/books");   
    return data;
  }

  async getOneBook(id) {
      const { data } = await this.host.get(`api/books/${id}`);
    //const book = await resp.json().catch((err) => console.error("Error", err));

    return data;
  }

  async addBook(newBook) {
      const { data } = await this.host.post(`api/books`, newBook);
    // const book = await resp.json().catch((err) => console.error("Error", err));
    await this.getAllBooks();
    return data;
  }

  async updateBook(id, updatedBook) {
    const resp = await this.host.put(`api/books/${id}`, updatedBook);
    // await resp.json().catch((err) => console.error("Error", err));
      console.log('responce for updateing book', resp);
    await this.getAllBooks();
  }

  async deleteBook(id) {
    const resp = await this.host.put(`api/books/${id}`);
    // await resp.json().catch((err) => console.error("Error", err));
      console.log('responce for deleting book', resp);
    await this.getAllBooks();
  }
}
