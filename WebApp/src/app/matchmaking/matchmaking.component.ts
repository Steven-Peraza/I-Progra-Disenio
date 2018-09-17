import { Component} from '@angular/core';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.css']
})
export class MatchmakingComponent {

  constructor(public _cs: ChatService) {
  }

}
