using BitirmeAPI.Data;
using BitirmeAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace BitirmeAPI.Repos
{
    public class ParentRepo : IParentRepo
    {
        private readonly IDataContext _context;
        public ParentRepo(BitirmeAPIContext context)
        {
            _context = context;
        }
        public async Task Add(Parent parent)
        {
            _context.Parent.Add(parent);
            await _context.SaveChangesAsync();
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Parent> Get(int id)
        {
            return await _context.Parent.FindAsync(id);
        }

        public async Task<IEnumerable<Parent>> GetAll()
        {
            return await _context.Parent.ToListAsync();
        }

        public Task Update(Parent parent)
        {
            throw new NotImplementedException();
        }
    }
}

       
    

