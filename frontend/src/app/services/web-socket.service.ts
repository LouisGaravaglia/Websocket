import { ChatMessageDto } from './../models/chatMessageDto';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket!: WebSocket;
  chatMessages: ChatMessageDto[] = [];
  chatRoomName: string = '';

  // constructor(public route: ActivatedRoute) {
  //   this.route.params.subscribe(params => this.chatRoomName = params.chatRoomName);
  //   console.log("url*** ", this.chatRoomName);
    
  //  }

  public openWebsocket() {
    
    this.webSocket = new WebSocket('ws://localhost:3000/chat/hii' + this.chatRoomName);
    // this.webSocket = new WebSocket('ws://localhost:3000/chat/');

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

  public sendMessage(chatMessageDto: ChatMessageDto, chatRoomName: string) {
    this.chatRoomName = chatRoomName;
    console.log("websocket url: ", 'ws://localhost:3000/chat/' + this.chatRoomName);
    
    this.webSocket.send(JSON.stringify(chatMessageDto));
    //I DON'T NEED TO ADD MESSAGE I'M SENDING TO MY CHATMESSAGES STATE SINCE
    //THE BACKEND WILL BE SENDING IT BACK TO ME SINCE IT SENDS TO EVERY CLIENT ON THE CHAT ROUTE
  }

  public closeWebsocket() {
    this.webSocket.close();
  }
}
