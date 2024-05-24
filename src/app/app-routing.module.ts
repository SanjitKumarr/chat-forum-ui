import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatCardComponent } from './components/chat-card/chat-card.component';
import { RoomCardComponent } from './components/room-card/room-card.component';

const routes: Routes = [
  {
    path: 'room',
    component: RoomCardComponent,
    outlet: 'popup'
  },
  {
    path: 'chat',
    component: ChatCardComponent,
  },
  { path: '',   redirectTo: '/room', pathMatch: 'full' },
  { path: '**', component: RoomCardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
