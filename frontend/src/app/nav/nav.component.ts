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
    console.log("in handle click");
    Object.keys(this.navLinks).map((key: string) => {
      if (key === linkName) {
        console.log("turning to active: ", key);
        console.log("turning value: ", this.navLinks[key]);
        this.navLinks[key] = "active";
      } else {
        console.log("deactivating: ", key);
        console.log("deactivating: ", this.navLinks[key]);
        this.navLinks[key] = "";
      }
    })
  }


}
