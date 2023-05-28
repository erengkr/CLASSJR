using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BitirmeAPI.Model
{
    public class SchoolLeader
    {
        [Key]
        public int schoolLeaderID { get; set; }
        public string? schoolName { get; set; }
        public string? schoolLeaderName { get; set; }
        public string? schoolLeaderSurname { get; set; }
        public string? schoolLeaderMail { get; set; }
        public string? schoolLeaderPassword { get; set; }
        public string? role { get; set; }
        public string? token { get; set; }

        //[JsonIgnore]
        //public Student? Student { get; set; }
        [JsonIgnore]
        public List<Student>? Student { get; set; }
        [JsonIgnore]
        public List<Teacher>? Teacher { get; set; }


    }
}
