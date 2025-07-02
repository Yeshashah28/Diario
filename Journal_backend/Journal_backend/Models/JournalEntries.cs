using System.ComponentModel.DataAnnotations;

namespace Journal_backend.Models
{
    public class JournalEntries
    {
        [Key]
        public int Id { get; set; }

        public string Title {  get; set; }

        public string Description { get; set; }

        public string Author { get; set; }

        public string Image { get; set; }

        public DateTime CreatedAt { get; set; }= DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
