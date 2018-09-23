import { Component, OnInit, Input } from '@angular/core';
import {BoardServiceService, GameStatus} from '../services/board-service.service';
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
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
  public itemsCollection2: AngularFirestoreCollection<Profile>;

  constructor(private _dataService: BoardServiceService, private _route: ActivatedRoute,
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
  "gameMode": "1",
  "dificultad": 1,
  "player1Sprite": "../../assets/img/mushroomsSprites/b.png",
  "player2Sprite": "../../assets/img/mushroomsSprites/c.png",
  "player1": "jafeth Vásquez",
  "player1uid": "ABTtsOaH2Le5zsR6Ey5GkDezt8s1",
  "player2uid": "AIPlayer",
  "player2": "AI Player",
  "size": "8",
  "bgColor": "green"
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
    if (this.currentStatus['stat'] == 2) {
      this.updateStats(this.currentStatus.uids[0].toString(), this.currentStatus.uids[1].toString(), this.currentStatus.win);
      this.updateNivel(this.currentStatus.uids[0].toString());
      this.updateNivel(this.currentStatus.uids[1].toString());
    }
   }


  updateStats(uidUp1: string, uidUp2: string, winner: number) {
    this.itemsCollection = this.afs.collection<Profile>('profiles', ref => ref.where('uid', '==', uidUp1));
    this.itemsCollection2 = this.afs.collection<Profile>('profiles', ref => ref.where('uid', '==', uidUp2));

    if ( winner == 1) {
      this.itemsCollection.doc(uidUp1).ref.get().then(function(doc) {
        if (doc.exists) {
          doc.ref.update({
            ganados: doc.data()['ganados'] + 1
            });
      } else {
          console.log("No such document!");
      }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      this.itemsCollection2.doc(uidUp2).ref.get().then(function(doc) {
        if (doc.exists) {
          doc.ref.update({
            perdidos: doc.data()['perdidos'] + 1
            });
      } else {
          console.log("No such document!");
      }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    }
    else if ( winner == 2) {
      this.itemsCollection.doc(uidUp1).ref.get().then(function(doc) {
        if (doc.exists) {
          doc.ref.update({
            perdidos: doc.data()['perdidos'] + 1
            });
      } else {
          console.log("No such document!");
      }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      this.itemsCollection2.doc(uidUp2).ref.get().then(function(doc) {
        if (doc.exists) {
          doc.ref.update({
            ganados: doc.data()['ganados'] + 1
            });
      } else {
          console.log("No such document!");
      }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    }
    else {
      this.itemsCollection.doc(uidUp1).ref.get().then(function(doc) {
        if (doc.exists) {
          doc.ref.update({
            empatados: doc.data()['empatados'] + 1
            });
      } else {
          console.log("No such document!");
      }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      this.itemsCollection2.doc(uidUp2).ref.get().then(function(doc) {
        if (doc.exists) {
          doc.ref.update({
            empatados: doc.data()['empatados'] + 1
            });
      } else {
          console.log("No such document!");
      }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    }
  }

  updateNivel(uidUp: string) {
    this.itemsCollection = this.afs.collection<Profile>('profiles', ref => ref.where('uid', '==', uidUp));
    this.itemsCollection.doc(uidUp).ref.get().then(function(doc) {
      if (doc.exists) {
        let partidasTot: number = doc.data()['ganados'] + doc.data()['perdidos'] + doc.data()['empatados'];
        let rendimiento: number = doc.data()['ganados'] / doc.data()['perdidos'];
        if (partidasTot > 9) {
          if (rendimiento >= 1 && rendimiento < 1.5) {
            doc.ref.update({
              nivel: "Buen Jugador",
              });
          } else if (rendimiento >= 1.5) {
            doc.ref.update({
              nivel: "Crack",
              });
          } else if (rendimiento < 1 && rendimiento >= 0.5) {
            doc.ref.update({
              nivel: "Malito pero no tanto",
              });
          } else if (rendimiento < 0.5) {
            doc.ref.update({
              nivel: "Salgase solo",
              });
          }
        }

    } else {
        console.log("No such document!");
    }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });


  }
}
