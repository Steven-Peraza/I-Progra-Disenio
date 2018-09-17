import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BoardServiceService } from "../services/board-service.service";
import { ProfilesServiceService } from '../services/profiles-service.service';
@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.css']
})
export class PlayViewComponent implements OnInit {

  constructor(private _router:Router,private _dataService:BoardServiceService, private _profileService:ProfilesServiceService) { }

  ngOnInit() {
    this.started = false;
    this._profileService.getUser()
    .subscribe(
      (user:firebase.User)=>{
        this.user = user
        console.log(user)
      }
    )
  }

  user:firebase.User = null
letters = [
  ["Rojo", "../../assets/img/mushroomsSprites/a.png"],
  ["Verde", "../../assets/img/mushroomsSprites/b.png"],
  ["Azul", "../../assets/img/mushroomsSprites/c.png"],
  ["d", "../../assets/img/mushroomsSprites/d.png"],
  ["f", "../../assets/img/mushroomsSprites/f.png"],
  ["g", "../../assets/img/mushroomsSprites/g.png"],
  ["h", "../../assets/img/mushroomsSprites/h.png"],
  ["i", "../../assets/img/mushroomsSprites/i.png"],
  ["j", "../../assets/img/mushroomsSprites/j.png"],
  ["k", "../../assets/img/mushroomsSprites/k.png"],
  ["l", "../../assets/img/mushroomsSprites/l.png"],
  ["m", "../../assets/img/mushroomsSprites/m.png"],
]
onChange(player,route){
  if(player == 1)
    this.gameConfig.player1Sprite = route
  else
    this.gameConfig.player2Sprite = route
}
onChangeBs(boardSize){
  this.gameConfig.size = boardSize
}
onChangeBg(backgroundColor){
  this.gameConfig.bgColor = backgroundColor
}
player1M = ""
player2M = ""

startGame(){
  this._dataService.createNewGame({'config':this.gameConfig})
  .subscribe((data)=>{this._router.navigate(["board",data['id']])})
}

started:boolean;

gameConfig = {
  player1Sprite:"",
  player2Sprite:"",
  player1:"player 1",
  player2:"player 2",
  size:"",
  bgColor:""
}

}
