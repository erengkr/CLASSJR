using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BitirmeAPI.Model
{
    public class Teacher
    {
        [Key]
        public int teacherID { get; set; }
        public string? teacherName { get; set; }
        public string? teacherSurname { get; set; }
        public string? teacherMail { get; set; }
        public string? teacherPassword { get; set; }
        public string? token { get; set; }
        public string? role { get; set; }
        [JsonIgnore]
        public List<Lesson>? Lesson { get; set; }
        [JsonIgnore]
        public SchoolLeader? SchoolLeader { get; set; }
        public int schoolLeaderID { get; set; }

    }
}
