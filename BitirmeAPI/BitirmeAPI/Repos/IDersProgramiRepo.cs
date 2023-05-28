using BitirmeAPI.Model;

namespace BitirmeAPI.Repos
{
    public interface IDersProgramiRepo
    {
        Task<DersProgrami> Get(int id);
        Task<IEnumerable<DersProgrami>> GetAll();
        Task Add(DersProgrami dersPrgorami);
        Task Delete(int id);
        Task Update(DersProgrami dersPrgorami);
    }
}
