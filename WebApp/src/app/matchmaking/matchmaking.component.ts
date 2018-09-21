import { Component} from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Observable, Subject } from 'rxjs';
import { MultiplayerService } from '../services/web-socket.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.css']
})
export class MatchmakingComponent {

  constructor(public _cs: ChatService, private sck:MultiplayerService) {
  }

  notifications: Subject<any>
  public connection;
  public messages = []

  ngOnInit(){
    this.connection = this.sck.getMessages().subscribe(message =>{
      this.messages.push(message)
      console.log(message)
    })
    this.sck.sendMessage("puto el que lo lea")
  }
    


}
