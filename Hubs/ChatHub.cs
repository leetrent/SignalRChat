using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            Console.WriteLine("[ChatHub][Hub] => user: '" + user + "'");
            Console.WriteLine("[ChatHub][Hub] => message: '" + message + "'");
            Console.WriteLine("[ChatHub][Hub] => Calling JavaScript cleint('ReceiveMessage')");

            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}