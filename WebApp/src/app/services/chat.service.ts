import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Mensaje } from '../interface/mensaje.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { ProfilesServiceService } from './profiles-service.service';

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];
  public usuario: any = {};


  constructor( private _authService: ProfilesServiceService,
  private afs: AngularFirestore ) {

      this._authService._firebaseAuth.authState.subscribe(user => {
        console.log('US: ', user);
        if (!user) {
          return;
        }

        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
      });
  }


  cargarMensajes() {

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));

    return this.itemsCollection.valueChanges()
        .pipe(map((mensajes: Mensaje[]) => {
          console.log( mensajes );
          this.chats = [];

          for (let mensaje of mensajes) {
            this.chats.unshift(mensaje);
          }
          return this.chats;
        }));
  }

  newMessage( texto: string) {
    let message: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };

    return this.itemsCollection.add( message );
  }

}
