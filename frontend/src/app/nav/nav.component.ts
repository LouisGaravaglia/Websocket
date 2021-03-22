import { Component } from '@angular/core';

interface navLinksObject {
  [key: string]: string
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  navLinks: navLinksObject = {"homeIsActive": "", "discoverIsActive": "", "chatIsActive": ""}
  chatRoomName: string = ""
  
  constructor() {
    const url = window.location.href;
    const params = url.split("/");
    this.chatRoomName = params[params.length - 1];
    console.log("url: ", url);

    if (url === "http://localhost:4200/discover") {
      this.navLinks["discoverIsActive"] = "active";
      this.navLinks["homeIsActive"] = "";
      this.navLinks["chatIsActive"] = "";
    } else if (url === "http://localhost:4200/") {
      this.navLinks["homeIsActive"] = "active";
      this.navLinks["discoverIsActive"] = "";
      this.navLinks["chatIsActive"] = "";
    } else {
      this.navLinks["chatIsActive"] = "active";
      this.navLinks["discoverIsActive"] = "";
      this.navLinks["homeIsActive"] = "";
    }
   }
  
  handleClick(linkName: string) {
    Object.keys(this.navLinks).map((key: string) => {
      if (key === linkName) {
        this.navLinks[key] = "active";
      } else {
        this.navLinks[key] = "";
      }
    })
  }
}
