import { Component} from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Observable, Subject } from 'rxjs';
import { MultiplayerService } from '../services/web-socket.service';
import { ProfilesServiceService } from '../services/profiles-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.css']
})
export class MatchmakingComponent {

  constructor(public _cs: ChatService, private sck:MultiplayerService, 
    private _profiles:ProfilesServiceService, private _router:Router) {
  }

  notifications: Subject<any>
  public connection;
  public matches = []

  ngOnInit(){
    this.connection = this.sck.getPendingMatches().subscribe((matches:any) =>{
      console.log(matches)
      this.matches = matches.matches
    })
    this._profiles.getUser().subscribe(
      (response)=>{
        this.sck.newConnection(response.uid)
      }
    )
  }

  joinMatch(id){
    this._profiles.getUser()
    .subscribe((user)=>{
      this.sck.joinMatch({id:id,user:user})
      this._router.navigate(["board","mp"])
    })
  }
    


}
