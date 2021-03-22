import { ChatMessageDto } from './../models/chatMessageDto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket!: WebSocket;
  chatMessages: ChatMessageDto[] = [];
  chatRoomName: string = '';

  public openWebsocket(chatRoomName: string) {
    this.chatRoomName = chatRoomName;
    this.webSocket = new WebSocket('ws://localhost:3000/chat/' + this.chatRoomName);

    this.webSocket.onopen = (event) => {
      console.log('Websocket Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      //ADD MESSAGE TO CHATMESSAGES STATE TO APPEND TO DOM
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('Websocket Closed: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto) {
    this.webSocket.send(JSON.stringify(chatMessageDto));
    //I DON'T NEED TO ADD MESSAGE I'M SENDING TO MY CHATMESSAGES STATE SINCE
    //THE BACKEND WILL BE SENDING IT BACK TO ME SINCE IT SENDS TO EVERY CLIENT ON THE CHAT ROUTE
  }

  public closeWebsocket() {
    this.webSocket.close();
  }
}
