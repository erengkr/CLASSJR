using System.ComponentModel.DataAnnotations;

namespace BitirmeAPI.Model
{
    public class Teache
    {
        [Key]
        public int teacheID { get; set; }
        public string? teacheName { get; set; }
        public string? teacheSurname { get; set; }
        public string? teacheMail { get; set; }
        public string? teachePassword { get; set; }
        public string? token { get; set; }
        public string? role { get; set; }
    }
}
