using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BitirmeAPI.Model
{
    public class Student
    {
        [Key]
        public int studentID { get; set; }
        public string? studentName { get; set; }
        public string? studentSurname { get; set; }
        public string? studentPassword { get; set; }
        public string? studentNo { get; set; }       
        public string? studentClass { get; set; }
        public string? role { get; set; }
        public string? token { get; set; }
        //[JsonIgnore] buraya dikkat et
        public List<Lesson>? Lesson { get; set; }
        
        public Parent? Parent { get; set; }
        public int? parentID { get; set; }
        //[JsonIgnore]
        public SchoolLeader? SchoolLeader { get; set; }
        public int schoolLeaderID { get; set; }        
    }
}
