import { Component} from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Observable, Subject } from 'rxjs';
import { MultiplayerService } from '../services/web-socket.service';
import { ProfilesServiceService } from '../services/profiles-service.service';


@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.css']
})
export class MatchmakingComponent {

  constructor(public _cs: ChatService, private sck:MultiplayerService, private _profiles:ProfilesServiceService) {
  }

  notifications: Subject<any>
  public connection;
  public messages = []

  ngOnInit(){
    this.connection = this.sck.getMessages().subscribe(message =>{
      this.messages.push(message)
      console.log(message)
    })
    this._profiles.getUser().subscribe(
      (response)=>{
        this.sck.newConnection(response.uid)
      }
    )
  }
    


}
