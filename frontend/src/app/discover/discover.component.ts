import { Component } from '@angular/core';

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

  handleClick(songName: string) {
    Object.keys(this.songLinks).map((key: string) => {
      if (key === songName) {
        this.songLinks[key] = "active";
      } else {
        this.songLinks[key] = "";
      }
    })
  }
}
