namespace Journal_backend.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Page { get; set; } = 1;
        public int Offset { get; set; } = 5;
    }
}
