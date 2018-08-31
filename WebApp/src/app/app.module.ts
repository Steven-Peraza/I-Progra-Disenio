// Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';



// Rutas
import { APP_ROUTING } from './app.routing';

// Services
import {BoardServiceService} from './services/board-service.service';



// Components
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PlayViewComponent } from './play-view/play-view.component';
import { LoginComponent } from './login/login.component';
import {environment} from '../environments/environment';
import { RegisterComponent } from './register/register.component'

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PlayViewComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [BoardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
