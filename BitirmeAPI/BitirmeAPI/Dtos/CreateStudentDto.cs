namespace BitirmeAPI.Dtos
{
    public class CreateStudentDto
    {

     
        public string? studentName { get; set; }
        public string? studentSurname { get; set; }
        public string? studentPassword { get; set; }
        public string? studentNo { get; set; }
        public string? studentClass { get; set; }
        public string? role { get; set; }
        public string? token { get; set; }
        public int schoolLeaderID { get; set; }
        public int parentID { get; set; }

    }
}
