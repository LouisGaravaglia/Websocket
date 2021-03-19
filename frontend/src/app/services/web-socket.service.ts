import { ChatMessageDto } from './../models/chatMessageDto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket!: WebSocket;
  chatMessages: ChatMessageDto[] = [];

  constructor() { }

  public openWebsocket() {
    this.webSocket = new WebSocket('ws://localhost:3000/chat');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log("message from server: ", event.data);
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
      console.log("this is chatMessages array: ");
      console.log(this.chatMessages);
      
      
    };

    this.webSocket.onclose = (event) => {
      console.log('Closed: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto) {
    this.webSocket.send(JSON.stringify(chatMessageDto));
    // this.chatMessages.push(chatMessageDto);
  }

  public closeWebsocket() {
    this.webSocket.close();
  }
}
