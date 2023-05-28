using BitirmeAPI.Model;

namespace BitirmeAPI.Repos
{
    public interface ILeaderRepo
    {
        Task<SchoolLeader> Get(int id);
        Task<IEnumerable<SchoolLeader>> GetAll();
        Task Add(SchoolLeader schoolLeader);
        Task Delete(int id);
        Task Update(SchoolLeader schoolLeader);
    }
}
