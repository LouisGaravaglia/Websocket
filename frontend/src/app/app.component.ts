// import { ChatService } from './chat.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // constructor(private chatService: ChatService) {
  //   chatService.messages.subscribe((msg: any) => {
  //     console.log("Response from Websocket Server: " + msg);
      
  //   });
  // }

  // private message = {
  //   author: 'elliot forbers',
  //   message: 'howdy'
  // }

  // sendMsg() {
  //   console.log("New message sent from client");
  //   this.chatService.messages.next(this.message)
    
  // }
}
