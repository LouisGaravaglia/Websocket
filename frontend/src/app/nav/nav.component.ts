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
  navLinks: navLinksObject = {"homeIsActive": "", "discoverIsActive": ""}
  
  constructor() {
    if (window.location.href === "http://localhost:4200/chat") {
      this.navLinks["homeIsActive"] = "";
      this.navLinks["discoverIsActive"] = "active";
    } else {
      this.navLinks["homeIsActive"] = "active";
      this.navLinks["discoverIsActive"] = "";
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
