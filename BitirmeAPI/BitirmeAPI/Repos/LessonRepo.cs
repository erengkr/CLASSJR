using BitirmeAPI.Data;
using BitirmeAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace BitirmeAPI.Repos
{
    public class LessonRepo : ILessonRepo
    {
        private readonly BitirmeAPIContext _context;
        public LessonRepo(BitirmeAPIContext context)
        {
            _context = context;
        }
        public async Task Add(Lesson lesson)
        {
            _context.Lesson.Add(lesson);
            await _context.SaveChangesAsync();
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Lesson> Get(int id)
        {
            return await _context.Lesson.FindAsync(id);
        }

        public async Task<IEnumerable<Lesson>> GetAll()
        {
            return await _context.Lesson.ToListAsync();
        }

        public Task Update(Lesson lesson)
        {
            throw new NotImplementedException();
        }
    }
}
