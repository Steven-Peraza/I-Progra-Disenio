//Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Rutas
import { APP_ROUTING } from './app.routing';

//Services
import {BoardServiceService} from './services/board-service.service'



//Components
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    APP_ROUTING
  ],
  providers: [BoardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
