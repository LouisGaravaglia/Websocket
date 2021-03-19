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

  //ON INIT LIFECYCLE HOOK
  ngOnInit(): void {
    this.webSocketService.openWebsocket()
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebsocket()
  }


  sendMessage(sendForm: NgForm) {
    const chatMessageDto = new ChatMessageDto(sendForm.value.user, sendForm.value.message)
    // console.log(sendForm.value);
    this.webSocketService.sendMessage(chatMessageDto);
    // this.webSocketService.sendMessage({user: "FAKE", message: "FAKEmessage"});
    //clear form by doing the following
    sendForm.controls.message.reset();
  }
}
