import {RouterModule, Routes } from '@angular/router';


// Components
import { BoardComponent } from './board/board.component';
import { PlayViewComponent } from "./play-view/play-view.component";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: PlayViewComponent },
  {path: 'board/:id', component: BoardComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
