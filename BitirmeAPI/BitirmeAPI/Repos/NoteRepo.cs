//using BitirmeAPI.Data;
//using BitirmeAPI.Model;
//using Microsoft.EntityFrameworkCore;

//namespace BitirmeAPI.Repos
//{
//    public class NoteRepo : INoteRepo
//    {
//        private readonly BitirmeAPIContext _context;
//        public NoteRepo(BitirmeAPIContext context)
//        {
//            _context = context;
//        }

//        public async Task Add(Note lessonNote)
//        {
//            _context.Note.Add(lessonNote);
//            await _context.SaveChangesAsync();
            
//        }

//        public Task Delete(int id)
//        {
//            throw new NotImplementedException();
//        }

//        public async Task<Note> Get(int id)
//        {
//            return await _context.Note.FindAsync(id);
//        }

//        public async Task<IEnumerable<Note>> GetAll()
//        {
//            return await _context.Note.ToListAsync();
//        }

//        public Task Update(Note lessonNote)
//        {
//            throw new NotImplementedException();
//        }
//    }
//}
