using System.Text.Json;
using System.Text.Json.Serialization;

namespace BitirmeAPI.Model
{
    public class Lesson
    {
        public int lessonID { get; set; }
        public string? lessonName { get; set; }
        
       
        public Student? Student { get; set; }       
        public int studentID { get; set; }           
        public Note Note { get; set; }
        [JsonIgnore]
        public Teacher Teacher { get; set; }
        public int teacherID { get; set; }
        public Semester Semester { get; set; }
        public int semesterID { get; set; }



    }
}
