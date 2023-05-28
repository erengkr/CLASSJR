using BitirmeAPI.Data;
using BitirmeAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace BitirmeAPI.Repos
{
    public class TeacheRepo : ITeacheRepo
    {
        private readonly BitirmeAPIContext _context;
        public TeacheRepo(BitirmeAPIContext context)
        {
            _context = context;
        }
        public async Task Add(Teache teache)
        {
            _context.Teache.Add(teache);
            await _context.SaveChangesAsync();
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Teache> Get(int id)
        {
            return await _context.Teache.FindAsync(id);
           
        }

        public  async Task<IEnumerable<Teache>> GetAll()
        {
            return await _context.Teache.ToListAsync();
        }

        public Task Update(Teache teache)
        {
            throw new NotImplementedException();
        }
    }
}
