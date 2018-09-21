import { Component, OnInit, Input } from '@angular/core';
import {BoardServiceService, GameStatus} from '../services/board-service.service';
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ProfilesServiceService } from '../services/profiles-service.service';
import { Profile } from '../interface/profile.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public itemsCollection: AngularFirestoreCollection<Profile>;
  public acm1pt$: Observable<Profile[]>;

  constructor(private _dataService: BoardServiceService, private _route: ActivatedRoute, private modalService: NgbModal,
    private _authService: ProfilesServiceService, private afs: AngularFirestore) {
   }
   ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    this._dataService.getConfig(this.id)
    .subscribe(
      (data) => {
        this.config = data;
      }
    );
    this.updateScreen();
   }
   currentStatus:GameStatus = { status: [],
   //dimension: 4,
   score: 200,
   stat: 1, 
   win: 0,
   player: 2,
   uids:["Ernie","Bert"]};
id:string = "-1"
config:any = {
  player1Sprite:"../../assets/img/mushroomsSprites/c.png",
player2Sprite:"../../assets/img/mushroomsSprites/b.png",
player1:"Jafeth",
player2:"Steven",
size:"8",
bgColor:"darkgreen"
}


   markPosition(j, k) {
     console.log("Fila " + j + " " + "Columna " + k);
     //this.currentStatus["status"][j][k] = "W";
    this._dataService.positionMarked(j, k, this.id)
    .subscribe((res: GameStatus) => this.writeInfo(res));
   }

   updateScreen() {
    this._dataService.getStatus(this.id)
    .subscribe((data: GameStatus) => this.writeInfo(data));
   }

   writeInfo(data: GameStatus) {
    this.currentStatus = {
      status: data['board'],
      score: data['score'],
      stat: data['stat'],
      win: data['win'],
      player: data['player'],
      uids: data['uids']
    };
   }

   open(content) {
    this.modalService.open(content);
  }

  updateStats() {
    let newStat: number[];
    this.itemsCollection = this.afs.collection<Profile>('profiles', ref => ref.where('uid', '==', this.currentStatus.uids[0]));
    this.itemsCollection.doc(this.itemsCollection.ref.id).ref.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
/*
    this.afs.doc(this.itemsCollection.ref.id).update({
      ganados: this.acm1pt$.ganados,
      perdidos: this.acm1pt$.perdidos,
      empatados: this.acm1pt$.empatados
    });
*/
  }
  }
