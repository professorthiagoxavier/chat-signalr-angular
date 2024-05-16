import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-chat';
  private hubConnection: HubConnection;
  public mensagens: string[] = [];
  public novaMensagem: string = "";
  
  constructor() {
    this.hubConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:7182/chat') // URL do seu hub
        .build();

    this.hubConnection.start()
        .then(() => console.log('Conectado ao hub'))
        .catch(err => console.error('Erro ao conectar ao hub', err));

    this.hubConnection.on('ReceberMensagem', (mensagem: string) => {
        console.log('Mensagem recebida do hub:', mensagem);
        this.mensagens.push(mensagem);
    });
}

enviarMensagem() {
    this.hubConnection.invoke('EnviarMensagem', this.novaMensagem)
        .catch(err => console.error('Erro ao enviar mensagem', err));
    this.novaMensagem = ""; // Limpa a caixa de texto após enviar a mensagem
}


}
