using BitirmeAPI.Data;
using BitirmeAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace BitirmeAPI.Repos
{
    public class StudentRepo : IStudentRepo
    {
        private readonly BitirmeAPIContext _context;
        public StudentRepo(BitirmeAPIContext context)
        {
            _context = context;
        }
        public async Task Add(Student student)
        {
            _context.Student.Add(student);           
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var item = _context.Student.Find(id);
            if (item == null)
            {
                throw new Exception(id + "  " + "Bulunamadı");
            }
            _context.Student.Remove(item);
            await _context.SaveChangesAsync();
        }

        public async Task<Student> Get(int id)
        {
            return await _context.Student.FindAsync(id);
          
        }
       


        public async Task<IEnumerable<Student>> GetAll()
        {
            return await _context.Student.ToListAsync();
        }

        public async Task Update(Student student)
        {
            var item = _context.Student.Find(student.studentID);
            if (item == null)
            {
                throw new Exception(student.studentID + "  " + "Bulunamadı");
            }            

            item.studentName = student.studentName;
            item.studentSurname = student.studentSurname;
            item.studentClass = student.studentClass;
            item.studentPassword = student.studentPassword;           
            await _context.SaveChangesAsync();
        }
    }
}
