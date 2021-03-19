// import { WebSocketService } from './services/web-socket.service';
// import { ChatService } from './chat.service';
// import { WebsocketService } from './websocket.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  // providers: [WebsocketService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
