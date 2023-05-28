using BitirmeAPI.Dtos;
using BitirmeAPI.Model;
using BitirmeAPI.Repos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BitirmeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DersProgramiController : ControllerBase
    {
        private readonly IDersProgramiRepo _dersProgramiRepo;
        public DersProgramiController(IDersProgramiRepo dersProgramiRepo)
        {
            _dersProgramiRepo = dersProgramiRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DersProgrami>>> GetDersProgrami()
        {
            var dersProgrami=await _dersProgramiRepo.GetAll();
            return Ok(dersProgrami);
        }
        [HttpPost]
        public async Task<ActionResult> CreateParent(CreateDersProgrami createDersProgrami)
        {
            DersProgrami dersProgrami = new DersProgrami();
            dersProgrami.pazartesi1 = createDersProgrami.pazartesi1;
            dersProgrami.pazartesi2 = createDersProgrami.pazartesi2;
            dersProgrami.pazartesi3 = createDersProgrami.pazartesi3;
            dersProgrami.pazartesi4 = createDersProgrami.pazartesi4;
            dersProgrami.pazartesi5 = createDersProgrami.pazartesi5;
            dersProgrami.pazartesi6 = createDersProgrami.pazartesi6;

            dersProgrami.sali1 = createDersProgrami.sali1;
            dersProgrami.sali2 = createDersProgrami.sali2;
            dersProgrami.sali3 = createDersProgrami.sali3;
            dersProgrami.sali4 = createDersProgrami.sali4;
            dersProgrami.sali5 = createDersProgrami.sali5;
            dersProgrami.sali6 = createDersProgrami.sali6;

            dersProgrami.carsamba1 = createDersProgrami.carsamba1;
            dersProgrami.carsamba2 = createDersProgrami.carsamba2;
            dersProgrami.carsamba3 = createDersProgrami.carsamba3;
            dersProgrami.carsamba4 = createDersProgrami.carsamba4;
            dersProgrami.carsamba5 = createDersProgrami.carsamba5;
            dersProgrami.carsamba6 = createDersProgrami.carsamba6;

            dersProgrami.persembe1 = createDersProgrami.persembe1;
            dersProgrami.persembe2 = createDersProgrami.persembe2;
            dersProgrami.persembe3 = createDersProgrami.persembe3;
            dersProgrami.persembe4 = createDersProgrami.persembe4;
            dersProgrami.persembe5 = createDersProgrami.persembe5;
            dersProgrami.persembe6 = createDersProgrami.persembe6;

            dersProgrami.cuma1 = createDersProgrami.cuma1;
            dersProgrami.cuma2 = createDersProgrami.cuma2;
            dersProgrami.cuma3 = createDersProgrami.cuma3;
            dersProgrami.cuma4 = createDersProgrami.cuma4;
            dersProgrami.cuma5 = createDersProgrami.cuma5;
            dersProgrami.cuma6 = createDersProgrami.cuma6;

            await _dersProgramiRepo.Add(dersProgrami);
            return Ok();
        }
    }
}
