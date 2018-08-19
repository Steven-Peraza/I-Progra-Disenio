import {RouterModule, Routes } from '@angular/router';


// Components
import { BoardComponent } from './board/board.component';

const APP_ROUTES: Routes = [
  { path: 'board', component: BoardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', redirectTo: 'board' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
