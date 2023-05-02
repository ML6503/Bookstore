using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace Bookstore.Models
{
    [BsonIgnoreExtraElements]
    public class BookModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } = String.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = String.Empty;

        [BsonElement("author")]
        public string Author { get; set; } = String.Empty;

        [BsonElement("publication_year")]
        public int PublicationYear { get; set; }

        [BsonElement("status")]
        [RegularExpression("Available|Purchased", ErrorMessage = "Invalid Status")]
        public string Status { get; set; } = String.Empty;

        [BsonElement("price")]
        public double Price { get; set; }

        //public string Username { get; set; } = null!;
    }


}

