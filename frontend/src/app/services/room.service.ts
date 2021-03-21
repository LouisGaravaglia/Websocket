// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class RoomService {
//   ROOMS = new Map();
//   name = "";
//   members = new Set();

//   constructor(roomName: string) {
//     this.name = roomName;
//    }

//    public get(roomName: string) {
//      if (!this.ROOMS.has(roomName)) {
//        this.ROOMS.set(roomName, new RoomService(roomName));
//      }
//      return this.ROOMS.get(roomName);
//    }

//    public join(member) {
//      this.members.add(member);
//    }
// }
