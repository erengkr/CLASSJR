using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BitirmeAPI.Data;
using BitirmeAPI.Repos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<BitirmeAPIContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BitirmeAPIContext") ?? throw new InvalidOperationException("Connection string 'BitirmeAPIContext' not found.")));

builder.Services.AddScoped<IDataContext>(provider => provider.GetService<BitirmeAPIContext>());
builder.Services.AddScoped<IStudentRepo, StudentRepo>();
builder.Services.AddScoped<IParentRepo, ParentRepo>();
builder.Services.AddScoped<ITeacheRepo, TeacheRepo>();
builder.Services.AddScoped<ILessonRepo, LessonRepo>();
builder.Services.AddScoped<ICommentRepo, CommentRepo>();
builder.Services.AddScoped<IStudentRepo, StudentRepo>();
builder.Services.AddScoped<ICommentRepo,CommentRepo > ();
builder.Services.AddScoped<ILeaderRepo, LeaderRepo>();
builder.Services.AddScoped<IDersProgramiRepo,DersProgramiRepo>();
//builder.Services.AddScoped<INoteRepo, NoteRepo>();









builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("veryverysceret.....")),
        ValidateAudience = false,
        ValidateIssuer = false,
        ClockSkew=TimeSpan.Zero
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("AllowAll");

app.MapControllers();

app.Run();
