import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.css']
})
export class PlayViewComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
    this.started = false;
  }
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
    this.player1M = route
  else
    this.player2M = route
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
  this._router.navigate(["board",this.gameConfig.bgColor,
    this.gameConfig.player1,
    this.gameConfig.player2,
    this.player1M,
    this.player2M,
  this.gameConfig.size]);
}

started:boolean;

gameConfig = {
  player1:"player 1",
  player2:"player 2",
  size:"",
  bgColor:""
}

}
