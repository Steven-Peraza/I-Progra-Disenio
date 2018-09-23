import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import * as io from 'socket.io-client';
 
@Injectable()
export class MultiplayerService {
  private url = 'http://localhost:3000';  
  private socket;
  
  sendMessage(message){
    this.socket.emit('crearPartida');    
  }

  newConnection(uid){
    this.socket.emit("new-connection", uid);
  }

  createMatch(config:any){
    this.socket.emit("crear-partida",config)
  }
  
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        console.log("ejemplo de "+this.socket.id)
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  
}