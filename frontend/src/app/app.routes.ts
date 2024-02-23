import { Routes } from '@angular/router';

import { UserComponent } from './user/user.component';

import { CommentsComponent } from './comments/comments.component';
import { GamesComponent } from './games/games.component';

export const routes: Routes = [
    {
        path: '', 
        component: UserComponent,
        title: 'Home Page'
    },
    {
        path:'comments/:username',
        component: CommentsComponent,
        title: 'Comments'
    },
    {
        path:'games',
        component: GamesComponent,
        title: 'Gams'

    }

];
