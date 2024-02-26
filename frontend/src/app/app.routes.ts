import { Routes } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { RoomComponent } from './components/room/room.component';
import { HomeComponent } from './components/home/home.component';
import { ConnectionGuard } from './services/connectionguard.service';



export const routes: Routes = [
    
    {
        path: '', 
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'user', 
        component: UserComponent,
        title: 'User'
    },
    {
        path: 'room/:roomName',
        canActivate: [ConnectionGuard],
        component: RoomComponent,
        title: 'Room'
    }
  
    
];


