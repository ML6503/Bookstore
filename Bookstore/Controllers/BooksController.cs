using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Bookstore.Services;
using Bookstore.Models;

namespace Bookstore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly BookServices _bookServices;

        public BooksController(BookServices booksServices)
        {
            _bookServices = booksServices;
        }

        // GET api/<BooksCotroller>
        [HttpGet]
        // public ActionResult<List<BookModel>> GetBooks()
        public async Task<List<BookModel>> GetBooks()
        {
            var books = await _bookServices.GetBooks();
            return books;

        }

        // GET api/<BooksCotroller>/sort?sortBy="sortType"&order="asc" | "desc"
        [HttpGet("sort")]
        // public ActionResult<List<BookModel>> GetBooks()
        public async Task<ActionResult<List<BookModel>>> GetSortedBooks([FromQuery] string sortBy, string order )
        {
            if (!sortBy.Any())
            {
                return NotFound("sort query not found");
            }
            var books = await _bookServices.GetSortedBooks(sortBy, order);
            return books;

        }


        // GET api/<BooksCotroller>/{id}
        [HttpGet("{id}")]
        // public ActionResult<BookModel> GetBook(string id)
        public async Task<ActionResult<BookModel>> GetBook(string id)
        {
            var book = await _bookServices.GetBook(id);

            if (book == null)
            {
                return NotFound($"Book with id = {id} not found");
            }

            return book;
        }

        // POST api/<BooksCotroller>
        [HttpPost]
        // public ActionResult<BookModel> AddBook([FromBody] BookModel book)
        public async Task<IActionResult> AddBook([FromBody] BookModel book)
        { 
            await _bookServices.AddBook(book);
            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);

        }

        // PUT api/<BooksCotroller>/{id}
        [HttpPut("{id}")]
        // public ActionResult Put([FromBody] BookModel book)
        public async Task<IActionResult> Put(string id, [FromBody] BookModel book)
        {
           
            var existingBook = await _bookServices.GetBook(id);
            if (existingBook == null)
            {
                return NotFound($"Book with id = {id} not found");
            }
            book.Id = existingBook.Id;
            await _bookServices.UpdateBook(id, book);

            return Ok($"Book with id = {id} updated");
        }

        // DELETE api/<BooksCotroller>/{id}
        [HttpDelete("{id}")]

        // public ActionResult Delete(string id)
        public async Task<IActionResult> Delete(string id)
        {
            var existingBook = await _bookServices.GetBook(id);
            if (existingBook == null)
            {
                return NotFound($"Book with id = {id} not found");
            }
            
            await _bookServices.DeleteBook(id);

            return Ok($"Book with id = {id} deleted");
        }
    }

}

