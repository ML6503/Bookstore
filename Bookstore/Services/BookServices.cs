using Bookstore.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Services
{
    public class BookServices : IBookServices
    {
        private readonly IMongoCollection<BookModel> _books;

     
        public BookServices(IOptions<MongoDBSettings> bookStoreDatabaseSettings)
        {
           
            MongoClient client = new MongoClient(bookStoreDatabaseSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(bookStoreDatabaseSettings.Value.DatabaseName);
            _books = database.GetCollection<BookModel>(bookStoreDatabaseSettings.Value.CollectionName);
           
        }

        // public List<BookModel> GetBooks() => _books.Find(book => true).ToList();

        public async Task<List<BookModel>> GetBooks() 
            // => await _books.Find(book => true).ToList();
        {
            return await _books.Find(book => true).ToListAsync();
        }

    // public BookModel GetBook(string id) => _books.Find(book => book.Id == id).FirstOrDefault();

    public async Task<BookModel> GetBook(string id) => await _books.Find(book => book.Id == id).FirstOrDefaultAsync();

        //public Book AddBook(Book book)
        public async Task AddBook( BookModel book) => await _books.InsertOneAsync(book);
      

        // public void DeleteBook(string id)
        public async Task  DeleteBook(string id)
        {
           await  _books.DeleteOneAsync(book => book.Id == id);
        }

        // public BookModel UpdateBook(BookModel book)
        public async  Task UpdateBook(string id, BookModel book)
        {
            await GetBook(id);
            await _books.ReplaceOneAsync(b => b.Id == id, book);
            return;
        }
      

    }
}
