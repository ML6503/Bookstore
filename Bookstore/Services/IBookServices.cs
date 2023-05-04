using Bookstore.Models;

namespace Bookstore.Services

{
    public interface IBookServices
    {
         Task<List<BookModel>> GetBooks();
        Task<BookModel> GetBook(string id);
        Task AddBook(BookModel book);
        Task DeleteBook(string id);
        Task UpdateBook(string id,BookModel book);
        Task<List<BookModel>> GetSortedBooks(string sortBy, string order);

    }
}
