using BitirmeAPI.Model;

namespace BitirmeAPI.Repos
{
    public interface IStudentRepo
    {
        Task<Student> Get(int id);  
        Task<IEnumerable<Student>> GetAll();
        Task Delete(int id);
        Task Add(Student student);
        Task Update(Student student);
    }
}
