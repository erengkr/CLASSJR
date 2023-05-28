namespace BitirmeAPI.Dtos
{
    public class CreateCommentDto
    {
        public int commentID { get; set; }
        public DateTime date { get; set; }
        public string? comment { get; set; }
    }
}
