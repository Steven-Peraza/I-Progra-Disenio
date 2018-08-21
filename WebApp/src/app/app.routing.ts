import {RouterModule, Routes } from '@angular/router';


// Components
import { BoardComponent } from './board/board.component';
import { PlayViewComponent } from "./play-view/play-view.component";

const APP_ROUTES: Routes = [
  { path: 'home', component: PlayViewComponent },
  {path: 'board/:bgColor/:player1/:player2/:p1Sprite/:p2Sprite/:size', component: BoardComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
