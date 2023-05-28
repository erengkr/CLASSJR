using BitirmeAPI.Data;
using BitirmeAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace BitirmeAPI.Repos
{
    public class DersProgramiRepo : IDersProgramiRepo
    {
        private readonly BitirmeAPIContext _context;
        public DersProgramiRepo(BitirmeAPIContext context)
        {
            _context = context;
        }
        public async Task Add(DersProgrami dersPrgorami)
        {
            _context.DersProgrami.Add(dersPrgorami);
            await _context.SaveChangesAsync();
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<DersProgrami> Get(int id)
        {
            return await _context.DersProgrami.FindAsync(id);
        }

        public async Task<IEnumerable<DersProgrami>> GetAll()
        {
            return await _context.DersProgrami.ToListAsync();
        }

        public Task Update(DersProgrami dersPrgorami)
        {
            throw new NotImplementedException();
        }
    }
}
