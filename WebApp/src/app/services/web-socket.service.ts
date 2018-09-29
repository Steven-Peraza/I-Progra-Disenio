import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import * as io from 'socket.io-client';

@Injectable()
export class MultiplayerService {
  private url = 'http://localhost:3000';
  private socket;

  sendMessage(message) {
    this.socket.emit('crearPartida');
  }

  newConnection(uid) {
    this.socket.emit("new-connection", uid);
  }

  createMatch(config: any) {
    this.socket = io(this.url);
    this.socket.emit("create-match", config);
  }

  joinMatch(user) {
    this.socket = io(this.url);
    this.socket.emit("start-match", user);
  }

  getPendingMatches() {
    this.socket = io(this.url);
    let observable = new Observable(observer => {
      this.socket.emit("get-matches");
      this.socket.on('pendingMatches', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getMoves() {
    let observable = new Observable(observer => {
      this.socket.on('moved', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }



  markPosition(i, j, id) {
    this.socket.emit("played", {row: i, column: j, id: id});
  }

  matchCreated() {
    let observable = new Observable(observer => {
      this.socket.on('match-created', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  playerFound() {
    let observable = new Observable(observer => {
      this.socket.on('player-found', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
