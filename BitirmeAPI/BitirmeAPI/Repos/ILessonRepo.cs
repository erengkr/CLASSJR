using BitirmeAPI.Model;

namespace BitirmeAPI.Repos
{
    public interface ILessonRepo
    {
        Task<Lesson> Get(int id);
        Task<IEnumerable<Lesson>> GetAll();
        Task Delete(int id);
        Task Add(Lesson lesson);
        Task Update(Lesson lesson);
    }
}
