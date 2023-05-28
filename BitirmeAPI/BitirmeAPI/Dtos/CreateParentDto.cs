namespace BitirmeAPI.Dtos
{
    public class CreateParentDto
    {
        public int parentID { get; set; }
        public string? parentName { get; set; }
        public string? parentSurname { get; set; }
        public string? parentMail { get; set; }
        public string? parentPassword { get; set; }
    }
}
