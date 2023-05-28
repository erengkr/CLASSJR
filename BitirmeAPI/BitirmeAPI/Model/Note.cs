using System.Text.Json.Serialization;

namespace BitirmeAPI.Model
{
    public class Note
    {
        public int noteID { get; set; }
       public string? note1 { get; set; }
        public string? note2 { get; set; }
        public string? note3 { get; set; }
        public string? note4 { get; set; }

        [JsonIgnore]
        public Lesson Lesson { get; set; }
        public int lessonID { get; set; }
        

    }
}
