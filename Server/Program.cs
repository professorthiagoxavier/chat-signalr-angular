using Microsoft.AspNetCore.SignalR;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();
app.MapHub<MyHub>("/chat");
app.UseCors();
app.Run();


class MyHub : Hub
{
    public async Task EnviarMensagem(string mensagem)
    {
        // Enviar a mensagem para todos os clientes conectados
        await Clients.All.SendAsync("ReceberMensagem", mensagem);
    }
}