using BitirmeAPI.Data;
using BitirmeAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace BitirmeAPI.Repos
{
    public class LeaderRepo : ILeaderRepo
    {
        private readonly IDataContext _context;
        public LeaderRepo(IDataContext context)
        {
            _context = context;
        }

        public async Task Add(SchoolLeader schoolLeader)
        {
            _context.SchoolLeader.Add(schoolLeader);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var item = _context.SchoolLeader.Find(id);
            if (item == null)
            {
                throw new Exception(id + "  " + "Bulunamadı");
            }
            _context.SchoolLeader.Remove(item);
            await _context.SaveChangesAsync();
        }

        public async Task<SchoolLeader> Get(int id)
        {
            return await _context.SchoolLeader.FindAsync(id);
        }

        public async Task<IEnumerable<SchoolLeader>> GetAll()
        {
            return await _context.SchoolLeader.ToListAsync();
        }

        public Task Update(SchoolLeader schoolLeader)
        {
            throw new NotImplementedException();
        }
    }
}
