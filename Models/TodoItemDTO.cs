namespace TodoApi.Models
{
    public class TodoItemDTO
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? Answer { get; set; }

        public string? Type { get; set; }
    }
}
