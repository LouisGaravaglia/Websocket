import { ChatMessageDto } from './../models/chatMessageDto';
import { WebSocketService } from './../services/web-socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  //INJECTING THIS CHATCOMPONENT WITH THE WEBSOCKET SERVICE
  constructor(public webSocketService: WebSocketService) { }


  //OPEN WEBSOCKET ON INIT LIFECYCLE HOOK
  ngOnInit(): void {
    this.webSocketService.openWebsocket()
  }

  //CLOSE WEBSOCKET ON DESTROY LIFECYCLE HOK
  ngOnDestroy(): void {
    this.webSocketService.closeWebsocket()
  }

  //SENDING A MESSAGE METHOD
  sendMessage(sendForm: NgForm) {
    const chatMessageDto = new ChatMessageDto(sendForm.value.user, sendForm.value.message)
    this.webSocketService.sendMessage(chatMessageDto);
    //CLEAR THE MESSAGE INPUT AFTER SENDING A MESSAGE, BUT NOT THE USER'S NAME
    sendForm.controls.message.reset();
  }
}
