import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "discover", component: DiscoverComponent},
  {path: "chat/:chatRoomName", component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
