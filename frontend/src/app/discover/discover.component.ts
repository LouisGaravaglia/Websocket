import { ChatMessageDto } from './../models/chatMessageDto';
import { WebSocketService } from './../services/web-socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface songLinksObject {
  [key: string]: string
}

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent {
  songLinks: songLinksObject = {
    "MusicianByPorterRobinson": "",
    "NotDeadYetByLordHuron": "",
    "PeachesByJustinBieber": "",
    "SoundAndVisionByHeladoNegro": ""
  };
  chatRoomName: string = "";



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
