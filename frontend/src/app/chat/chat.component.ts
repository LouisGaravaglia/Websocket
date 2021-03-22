import { ChatMessageDto } from './../models/chatMessageDto';
import { WebSocketService } from './../services/web-socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface songLinksObject {
  [key: string]: string
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  chatRoomName: string = "";
  userName: string | null = "";
  userNameDisplay: string = "";
  messageDisplay: string = "d-none";
  songLinks: songLinksObject = {
    "MusicianByPorterRobinson": "",
    "NotDeadYetByLordHuron": "",
    "PeachesByJustinBieber": "",
    "SoundAndVisionByHeladoNegro": ""
  };

  //INJECTING THIS CHATCOMPONENT WITH THE WEBSOCKET SERVICE
  constructor(public webSocketService: WebSocketService, public route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.chatRoomName = params.chatRoomName);
  }

  //OPEN WEBSOCKET ON INIT LIFECYCLE HOOK
  ngOnInit(): void {
    this.webSocketService.openWebsocket(this.chatRoomName)
  }

  //CLOSE WEBSOCKET ON DESTROY LIFECYCLE HOK
  ngOnDestroy(): void {
    console.log("closing websocket");
    this.webSocketService.closeWebsocket()
  }

  //SENDING A MESSAGE METHOD
  sendMessage(messageForm: NgForm) {
    console.log("this is message: ", messageForm.value.message);
    
    const chatMessageDto = new ChatMessageDto(this.userName === null ? "" : this.userName, messageForm.value.message, "chat")
    this.webSocketService.sendMessage(chatMessageDto);
    //CLEAR THE MESSAGE INPUT AFTER SENDING A MESSAGE, BUT NOT THE USER'S NAME
    messageForm.controls.message.reset();
  }

  //SENDING A MESSAGE METHOD
  createUser(sendForm: NgForm) {

    this.userName = sendForm.value.userName
    console.log("userName: ", this.userName);
    const chatMessageDto = new ChatMessageDto(this.userName === null ? "" : this.userName, "joined chat", "join")
    this.webSocketService.sendMessage(chatMessageDto);

    //REMOVE THE USERNAME PROMPT ONCE ANSWERED AND DISPLAY THE MESSAGE FIELD
    this.userNameDisplay = "d-none";
    this.messageDisplay = "";
  }
}
