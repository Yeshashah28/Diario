namespace Journal_backend.Dto
{
    public class JournalDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Author { get; set; }

        public string Image { get; set; }

        public int Page { get; set; } = 1;

        public int Offset { get; set; } = 5;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
