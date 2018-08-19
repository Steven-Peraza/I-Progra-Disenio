import {RouterModule, Routes } from '@angular/router';


// Components
import { BoardComponent } from './board/board.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: BoardComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
