using BitirmeAPI.Model;
using System.Text.Json.Serialization;

namespace BitirmeAPI.Dtos
{
    public class CreateLessonDto
    {
        
        public string lessonName { get; set; }       
        public int studentID { get; set; } 
        public int teacherID { get; set; }
        public int semesterID { get; set; }

    }
}
