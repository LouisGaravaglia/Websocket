import { ChatMessageDto } from './../models/chatMessageDto';
import { WebSocketService } from './../services/web-socket.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
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
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  songLinks: songLinksObject = {
    "MusicianByPorterRobinson": "",
    "NotDeadYetByLordHuron": "",
    "PeachesByJustinBieber": "",
    "SoundAndVisionByHeladoNegro": ""
  };
  chatRoomName: string = "";
  userName: string | null = "";
  userNameDisplay: string = "";
  messageDisplay: string = "d-none";

  //INJECTING THIS CHATCOMPONENT WITH THE WEBSOCKET SERVICE
  constructor(public webSocketService: WebSocketService, public route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.chatRoomName = params.chatRoomName);

  }


  //OPEN WEBSOCKET ON INIT LIFECYCLE HOOK
  ngOnInit(): void {

    this.webSocketService.openWebsocket(this.chatRoomName)

  }

  ngAfterViewInit(): void {

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

    //CLEAR THE MESSAGE INPUT AFTER SENDING A MESSAGE, BUT NOT THE USER'S NAME
    this.messageDisplay = "";
    this.userNameDisplay = "d-none";
  }

  handleClick(songName: string) {
    Object.keys(this.songLinks).map((key: string) => {
      if (key === songName) {
        this.songLinks[key] = "active";
      } else {
        this.songLinks[key] = "";
      }
    })
    this.chatRoomName = songName;
  }
}
