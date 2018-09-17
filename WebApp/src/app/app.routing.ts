import {RouterModule, Routes } from '@angular/router';


// Components
import { BoardComponent } from './board/board.component';
import { PlayViewComponent } from "./play-view/play-view.component";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

const APP_ROUTES: Routes = [
  { path: 'home', component: PlayViewComponent, canActivate: [AuthGuardService] },
  {path: 'board/:id', component: BoardComponent, canActivate: [AuthGuardService]},
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
