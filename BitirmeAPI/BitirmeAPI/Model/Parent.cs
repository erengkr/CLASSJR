using System.Text.Json.Serialization;

namespace BitirmeAPI.Model
{
    public class Parent
    {
        public int parentID { get; set; }
        public string? parentName { get; set; }
        public string? parentSurname { get; set; }
        public string? parentMail { get; set; }
        public string? parentPassword { get; set; }
        public string? role { get; set; }
        public string? token { get; set; }

        [JsonIgnore]
        public Student? Student { get; set; }
    }
}
