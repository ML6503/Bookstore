using Bookstore.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;
using System.Globalization;
using System.Text.Json.Serialization;

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
                

        public async Task<List<BookModel>> GetSortedBooks(string sortBy, string order )
                
        {
            var ASC = "asc";
            var NAME = "title";
            var AUTHOR = "author";
            var YEAR = "year";
            var PRICE = "price";

            var sort = Builders<BookModel>.Sort.Ascending(b => b.Name);
            if (string.IsNullOrWhiteSpace(order))
            {

                sort = Builders<BookModel>.Sort.Ascending(b => b.Name).Ascending(b => b.Author).Descending(b => b.Price);
            }
            if (order == ASC)
            {
                if (sortBy == NAME)
                {
                    sort = Builders<BookModel>.Sort.Ascending(b => b.Name);
                }
                if (sortBy == AUTHOR)
                {
                    sort = Builders<BookModel>.Sort.Ascending(b => b.Author);
                }
                if (sortBy == YEAR)
                {
                    sort = Builders<BookModel>.Sort.Ascending(b => b.PublicationYear);
                }
                if (sortBy == PRICE)
                {
                    sort = Builders<BookModel>.Sort.Ascending(b => b.Price);
                }
            }
            else {
                if (sortBy == NAME)
                {
                    sort = Builders<BookModel>.Sort.Descending(b => b.Name);
                }
                if (sortBy == AUTHOR)
                {
                    sort = Builders<BookModel>.Sort.Descending(b => b.Author);
                }
                if (sortBy == YEAR)
                {
                    sort = Builders<BookModel>.Sort.Descending(b => b.PublicationYear);
                }
                if (sortBy == PRICE)
                {
                    sort = Builders<BookModel>.Sort.Descending(b => b.Price);
                }
            }

           

            //var books = await _books.Find(book => true).Sort(sort).ToListAsync();

            return await _books.Find(book => true).Sort(sort).ToListAsync();
           
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
